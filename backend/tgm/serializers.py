import logging

from rest_framework import serializers

from .models import User

logger = logging.getLogger(__name__)


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """"""

    def __init__(self, *args, **kwargs):
        fields = kwargs.pop("fields", None)
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class UserSerializer(DynamicFieldsModelSerializer):
    """"""

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
