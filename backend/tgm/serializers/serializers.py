import logging

from rest_framework import serializers

from ..models import (
    Facebook,
    Instagram,
    Tenant,
    TenantSetting,
    Twitter,
    User,
    UserSetting,
)
from .base_serializers import DynamicFieldsModelSerializer
from .fields import LastUpdatedAtField
from .mixins import FormatedDateTimeMixin

logger = logging.getLogger(__name__)


class InstagramSerializerForTenantCreate(serializers.Serializer):
    """"""

    name = serializers.CharField()
    username = serializers.CharField()
    business_account_id = serializers.CharField()
    access_token = serializers.CharField()


class InstagramSerializer(DynamicFieldsModelSerializer, FormatedDateTimeMixin):
    """Instagramのシリアライザー."""

    created_at = serializers.SerializerMethodField(read_only=True)
    updated_at = serializers.SerializerMethodField(read_only=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    class Meta:
        model = Instagram
        fields = "__all__"


class FacebookSerializer(DynamicFieldsModelSerializer, FormatedDateTimeMixin):
    """Facebookのシリアライザー."""

    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    class Meta:
        model = Instagram
        fields = "__all__"


class TwitterSerializer(DynamicFieldsModelSerializer, FormatedDateTimeMixin):
    """Twitterのシリアライザー."""

    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    class Meta:
        model = Instagram
        fields = "__all__"


class UserSerializerForDisp(DynamicFieldsModelSerializer, FormatedDateTimeMixin):
    """ユーザー情報のシリアライザー(参照用)."""

    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    class Meta:
        model = User
        fields = [
            "auth0_id",
            "auth0_name",
            "username",
            "email",
            "email_verified",
            "phone_number",
            "created_at",
            "updated_at",
        ]


class TenantSerializer(DynamicFieldsModelSerializer, FormatedDateTimeMixin):
    """テナントのシリアライザー."""

    user = UserSerializerForDisp(
        read_only=True,
        fields=[
            "auth0_id",
            "auth0_name",
            "username",
            "email",
            "phone_number",
            "created_at",
            "updated_at",
        ],
    )

    # auth0_idをリクエスト時に受け取って紐づける用
    auth0_id = serializers.CharField(write_only=True)

    remarks = serializers.CharField(required=False, allow_null=True, allow_blank=True)

    # テナント登録時用のinstagramData
    instagramData = InstagramSerializerForTenantCreate(write_only=True, allow_null=True)

    instagram = InstagramSerializer(
        read_only=True,
        fields=[
            "id",
            "name",
            "username",
            "created_at",
            "updated_at",
            "business_account_id",
            "access_token",
        ],
    )

    connected_instagram = serializers.SerializerMethodField(read_only=True)

    created_at = serializers.SerializerMethodField(read_only=True)
    updated_at = serializers.SerializerMethodField(read_only=True)
    last_updated_at = LastUpdatedAtField(source="updated_at", read_only=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def create(self, validated_data):
        logger.info("★★★★★★★★★★★★★★★★★")
        logger.info(validated_data)

        auth0_id = validated_data.pop("auth0_id", None)
        if not auth0_id:
            raise serializers.ValidationError("auth0_idのため、ユーザーを取得出来ません。")

        try:
            user = User.objects.get(auth0_id=auth0_id)
        except User.DoesNotExist:
            raise serializers.ValidationError("指定されたauth0_idに対応するユーザーが見つかりませんでした。")

        try:
            tenant = Tenant.objects.create(
                user=user,
                name=validated_data["name"],
                remarks=validated_data["remarks"],
            )
        except Exception:
            raise serializers.ValidationError("テナント作成時にエラーが発生しました。")

        return tenant

    def get_connected_instagram(self, obj):
        return hasattr(obj, "instagram")

    class Meta:
        model = Tenant
        fields = [
            "id",
            "auth0_id",
            "user",
            "name",
            "instagram",
            "connected_instagram",
            "instagramData",
            "created_at",
            "updated_at",
            "last_updated_at",
            "remarks",
        ]


class UserSettingSerializer(DynamicFieldsModelSerializer, FormatedDateTimeMixin):
    """ユーザー毎の設定のシリアライザー."""

    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    class Meta:
        model = UserSetting
        fields = ["created_at", "updated_at"]


class UserSerializer(DynamicFieldsModelSerializer, FormatedDateTimeMixin):
    """ユーザー情報のシリアライザー."""

    tenants = TenantSerializer(source="user_tenants", many=True, read_only=True)
    settings = UserSettingSerializer(source="usersetting", read_only=True)
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    class Meta:
        model = User
        fields = [
            "auth0_id",
            "auth0_name",
            "username",
            "email",
            "email_verified",
            "phone_number",
            "created_at",
            "updated_at",
            "tenants",
            "settings",
        ]
