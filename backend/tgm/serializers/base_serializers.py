from rest_framework import serializers


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
