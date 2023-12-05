import logging

logger = logging.getLogger(__name__)

from rest_framework.exceptions import ErrorDetail

TENANT_ERROR_MSG = {
    "invalid_auth0_id": "auth0_Idが正しくないため、ユーザーを取得出来ません。",
    "not_exist_user": "指定されたauth0_idに対応するユーザーが見つかりませんでした。",
    "already_linked_instagram": "このインスタグラムアカウントは既に他のアカウントと紐づいています。",
    "create_tenant_error": "テナント作成時にエラーが発生しました。",
    "linked_instagram_error": "テナントとインスタグラムの紐づけに失敗しました。",
}

ERROR_MSG: {"INSTAGRAM": TENANT_ERROR_MSG}


def format_serializer_error(errors):
    """シリアライザーのerrorsをフロント用に整形する."""

    # TODO 複数の対応、例外対応

    error_data = errors[0]
    return error_data
