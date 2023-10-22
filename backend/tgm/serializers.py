import logging
from datetime import datetime

import pytz
from rest_framework import serializers

from .models import (
    Facebook,
    Instagram,
    Tenant,
    TenantSetting,
    Twitter,
    User,
    UserSetting,
)
from .utils.formater import utc_to_jst

logger = logging.getLogger(__name__)


class FormatedDateTimeMixin:
    def get_created_at(self, obj):
        """作成日時をフォーマットし取得."""
        if obj.created_at == None:
            return ""
        return utc_to_jst(obj.created_at).strftime("%Y/%m/%d %H:%M")

    def get_updated_at(self, obj):
        """更新日時をフォーマットし取得."""

        if obj.created_at == None:
            return ""
        return utc_to_jst(obj.created_at).strftime("%Y/%m/%d %H:%M")


class LastUpdatedAtField(serializers.Field):
    """最終更新日時."""

    def to_representation(self, value):
        tokyo_tz = pytz.timezone("Asia/Tokyo")
        now = datetime.now(tokyo_tz)
        delta = now - value

        days = delta.days

        if days < 30:
            return f"{days}日前"
        elif days < 365:
            months = days // 30
            return f"{months}か月前"
        else:
            years = days // 365
            return f"{years}年前"


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """シリアライザーの拡張.

    必要なフィールドを指定してそのフィールドだけ返す事が出来る。
    全部読み込むのが重い時などは良い。
    """

    def __init__(self, *args, **kwargs):
        fields = kwargs.pop("fields", None)
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class InstagramSerializer(DynamicFieldsModelSerializer, FormatedDateTimeMixin):
    """Instagramのシリアライザー."""

    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

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


class TenantSerializer(DynamicFieldsModelSerializer, FormatedDateTimeMixin):
    """テナントのシリアライザー."""

    instagram = InstagramSerializer(read_only=True)
    facebook = FacebookSerializer(read_only=True)
    twitter = TwitterSerializer(read_only=True)

    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()
    last_updated_at = LastUpdatedAtField(source="updated_at")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    class Meta:
        model = Tenant
        fields = [
            "user",
            "name",
            "instagram",
            "facebook",
            "twitter",
            "created_at",
            "updated_at",
            "last_updated_at",
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
