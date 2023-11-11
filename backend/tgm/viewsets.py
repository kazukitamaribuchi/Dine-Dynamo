import base64
import hashlib
import hmac
import logging
import os

from rest_framework import (
    authentication,
    filters,
    generics,
    mixins,
    permissions,
    serializers,
    status,
    viewsets,
)
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.serializers import (
    TokenRefreshSerializer,
    TokenVerifySerializer,
)
from rest_framework_simplejwt.tokens import RefreshToken

from .models import (
    Facebook,
    Instagram,
    Tenant,
    TenantSetting,
    Twitter,
    User,
    UserSetting,
)
from .serializers import TenantSerializer, UserSerializer, UserSettingSerializer
from .serializers.errors import format_serializer_error
from .utils.instagram import InstagramAPIHandler, check_instagram_user

logger = logging.getLogger(__name__)


class AuthViewSet(viewsets.ViewSet):
    """認証のViewSet."""

    permission_classes = (AllowAny,)

    @action(detail=False, methods=["post"])
    def token(self, request):
        """トークン発行のエンドポイント.

        DBに存在するユーザーならアクセストークンを発行する。
        """

        try:
            auth0_id = request.data["auth0_id"]
            logger.info("auth0_id: %s", auth0_id)
        except:
            logger.warning("不正なリクエストです。")
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(auth0_id=auth0_id)
        except User.DoesNotExist:
            logger.warning("存在しないユーザーのため、アクセストークン発行は出来ません。")
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        try:
            logger.debug(user)
            refresh = RefreshToken.for_user(user)
            token = {
                "refresh_token": str(refresh),
                "access_token": str(refresh.access_token),
            }
            return Response(token, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error("トークン生成処理でエラーが発生しました。")
            logger.error(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["post"], url_path="token/refresh")
    def refresh_token(self, request):
        """リフレッシュトークンを元にアクセストークンを再発行するエンドポイント."""

        serializer = TokenRefreshSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        except TokenError as e:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"detail": str(e)})

    @action(detail=False, methods=["post"], url_path="token/verify")
    def verify_token(self, request):
        """トークン検証用のエンドポイント."""

        serializer = TokenVerifySerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        except TokenError as e:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"detail": str(e)})


class InstagramViewSet(viewsets.ViewSet):
    """Instagram Viewset."""

    permission_classes = (AllowAny,)

    def list(self, request):
        """トップページ."""
        logger.debug("テスト")
        return Response({"message": "Done"}, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"])
    def media(self, request):
        """投稿一覧."""

        logger.debug(request.data)

        handler = InstagramAPIHandler()

        # 遅いので廃止
        # response = handler.get_users_media_detail(insight=False)

        response = handler.get_users_media_info()

        return Response(response, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"])
    def media_insight(self, request):
        """投稿一覧とインサイト一覧.

        mediaid一覧が渡された場合、そのmediaidのインサイトを返す
        """

        logger.debug(request.data)

        handler = InstagramAPIHandler()
        response = handler.get_users_media_detail(insight=True)

        return Response(response, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"])
    def story(self, request):
        """ストーリー一覧."""

        logger.debug(request.data)

        handler = InstagramAPIHandler()
        response = handler.get_users_story_detail()

        print(response)

        return Response(response, status=status.HTTP_200_OK)

    @action(detail=False, methods=["post"])
    def check_user(self, request):
        """Instagramユーザーの存在確認.

        ビジネスアカウントIDとアクセストークンを元に存在確認を行う
        """

        logger.debug(request.data)

        try:
            business_id = request.data["business_account_id"]
            token = request.data["token"]
        except KeyError:
            logger.error("リクエストパラメータの指定が間違っています。")
            return Response(status=status.HTTP_400_BAD_REQUEST)

        response = check_instagram_user(business_id, token)
        print(response)

        try:
            if "error" in response:
                error_type = response["error"]["type"]
                return Response(
                    {"type": error_type},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            return Response(response, status=status.HTTP_200_OK)

        except Exception:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class FacebookViewSet(viewsets.ViewSet):
    """Facebook Viewset."""

    permission_classes = (AllowAny,)

    def list(self, request):
        """トップページ."""
        return Response({"message": "Done"}, status=status.HTTP_200_OK)


class TwitterViewSet(viewsets.ViewSet):
    """Twitter Viewset."""

    permission_classes = (AllowAny,)

    def list(self, request):
        """トップページ."""
        return Response({"message": "Done"}, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    """"""

    serializer_class = UserSerializer
    queryset = User.objects.all()
    # permission_classes = (IsAuthenticated,)
    permission_classes = (AllowAny,)

    def retrieve(self, request, *args, **kwargs):
        auth0_id = self.kwargs["pk"]
        instance = User.objects.get(auth0_id=auth0_id)
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["get"], detail=True)
    def tenants(self, request, pk=None):
        """"""

        # user = User.objects.get(auth0_id="google-oauth2|103115413586892783733")

        user = self.get_object()
        tenants = user.user_tenants.all()
        serializer = TenantSerializer(tenants, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["post"], detail=False, permission_classes=[AllowAny])
    def auth0_signup(self, request):
        """Auth0のsignup.

        auth0のpost user registration actionから呼ばれる。

        ・メール未認証フラグを立てユーザー登録を行う
        ・メールアドレスに対して認証メールを送信する
        """

        logger.debug("request.data: {}".format(request.data))

        try:
            auth0_id = request.data["auth0_id"]

        except KeyError as e:
            logger.error(e)
            return Response(status.HTTP_400_BAD_REQUEST)

        secret_key = os.environ["AUTH0_SECRET"]
        signature = request.headers.get("X-Signature")
        hmac_obj = hmac.new(secret_key.encode(), auth0_id.encode(), hashlib.sha256)
        calculated_signature = base64.b64encode(hmac_obj.digest()).decode()

        if not hmac.compare_digest(signature, calculated_signature):
            logger.warning("トークンが不正な形式です。")
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                logger.info(
                    "新規ユーザーを登録しました。 auth0_id: {}".format(request.data["auth0_id"])
                )
                self.perform_create(serializer)

                # TODO 認証メール送信
                return Response(status.HTTP_201_CREATED)

        except Exception as e:
            logger.error("リクエストが正しい形式でないため、ユーザー登録に失敗しました。")
            return Response(status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(auth0_id=auth0_id)
            UserSetting.objects.create(
                user=user,
            )
        except Exception as e:
            logger.error("ユーザーの設定テーブル作成に失敗しました。")
            return Response(status.HTTP_400_BAD_REQUEST)

        return Response(status.HTTP_200_OK)

    @action(methods=["post"], detail=False, permission_classes=[AllowAny])
    def auth0_login(self, request):
        """Auth0のlogin.

        auth0のlogin actionから呼ばれる。
        通常のログイン、SSOを介したサインアップ、ログイン

        ・ユーザー登録していなかったらメール認証済で登録
        """

        logger.debug("request.data: {}".format(request.data))

        try:
            auth0_id = request.data["auth0_id"]

        except KeyError as e:
            logger.error(e)
            return Response(status.HTTP_400_BAD_REQUEST)

        secret_key = os.environ["AUTH0_SECRET"]
        signature = request.headers.get("X-Signature")
        hmac_obj = hmac.new(secret_key.encode(), auth0_id.encode(), hashlib.sha256)
        calculated_signature = base64.b64encode(hmac_obj.digest()).decode()

        if not hmac.compare_digest(signature, calculated_signature):
            logger.warning("トークンが不正な形式です。")
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            User.objects.get(auth0_id=auth0_id)

        except User.DoesNotExist:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                logger.info(
                    "新規ユーザーを登録しました。 auth0_id: {}".format(request.data["auth0_id"])
                )
                self.perform_create(serializer)
                return Response(status.HTTP_201_CREATED)

            logger.error("リクエストが正しい形式でないため、ユーザー登録に失敗しました。")
            return Response(status.HTTP_400_BAD_REQUEST)

        return Response(status.HTTP_200_OK)


class TenantViewSet(viewsets.ModelViewSet):
    """Tenant Viewset."""

    serializer_class = TenantSerializer
    queryset = Tenant.objects.all()
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        """テナントを作成する.

        name: 店舗名
        instagramData: インスタ情報
            business_account_id: ビジネスアカウントID
            name
            username
            access_token
        remarks: 備考
        """

        logger.info(request.data)

        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)

            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except serializers.ValidationError as e:
            logger.error("テナント作成でエラーが発生しました。")
            logger.error(serializer.errors)

            # error_detail = format_serializer_error(serializer.errors)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        serializer.save()
