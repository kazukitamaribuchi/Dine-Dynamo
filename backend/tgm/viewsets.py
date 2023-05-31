import logging

from rest_framework import (
    authentication,
    filters,
    generics,
    mixins,
    permissions,
    status,
    viewsets,
)
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Facebook, Instagram, Twitter, User
from .serializers import UserSerializer

logger = logging.getLogger(__name__)


class AuthViewSet(viewsets.ViewSet):
    """認証のViewSet."""

    permission_classes = (permissions.AllowAny,)

    @action(detail=False, methods=["post"])
    def jwt(self, request):
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
            # TODO 有効期限とか
            refresh = RefreshToken.for_user(user)
            # logger.info(refresh)
            # logger.info(dir(refresh))
            # logger.info(refresh.check_exp)
            token = {
                "refresh_token": str(refresh),
                "access_token": str(refresh.access_token),
            }
            return Response(token, status=status.HTTP_200_OK)
        except:
            logger.error("トークン生成処理でエラーが発生しました。")
            return Response(status=status.HTTP_400_BAD_REQUEST)


class InstagramViewSet(viewsets.ViewSet):
    """Instagram Viewset."""

    permission_classes = (permissions.AllowAny,)

    def list(self, request):
        """トップページ."""
        logger.debug("テスト")
        return Response({"message": "Done"}, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"])
    def me(self, request):
        """ユーザー情報."""

        logger.debug(request.data)
        return Response({"message": "Done"}, status=status.HTTP_200_OK)


class FacebookViewSet(viewsets.ViewSet):
    """Facebook Viewset."""

    permission_classes = (permissions.AllowAny,)

    def list(self, request):
        """トップページ."""
        return Response({"message": "Done"}, status=status.HTTP_200_OK)


class TwitterViewSet(viewsets.ViewSet):
    """Twitter Viewset."""

    permission_classes = (permissions.AllowAny,)

    def list(self, request):
        """トップページ."""
        return Response({"message": "Done"}, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    """"""

    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    # TODO retriveとかでもauth0_idを元に検索するようにする

    @action(methods=["post"], detail=False)
    def auth0_signup(self, request):
        """Auth0のsignup.

        auth0のpost user registration actionから呼ばれる。

        ・メール未認証フラグを立てユーザー登録を行う
        ・メールアドレスに対して認証メールを送信する
        """

        logger.debug("request.data: {}".format(request.data))

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

    @action(methods=["post"], detail=False)
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
