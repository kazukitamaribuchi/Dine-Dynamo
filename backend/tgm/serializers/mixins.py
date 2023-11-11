from ..utils.formater import utc_to_jst


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
