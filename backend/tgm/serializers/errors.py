import logging

logger = logging.getLogger(__name__)

from rest_framework.exceptions import ErrorDetail

INSTAGRAM_ERROR_MSG = {
    "business_acount_id": {"unique": "既に同一のインスタグラムアカウントが他のテナントと連携されています。"}
}

ERROR_MSG = {
    "instagram": INSTAGRAM_ERROR_MSG,
}


def format_serializer_error(errors):
    """シリアライザーのerrorsをフロント用に整形する.

    code: エラーコード
    message: エラーメッセージ
    """


#     result = []

#     for key, value in errors.items():
#         if isinstance(value, list[ErrorDetail]):
#             # エラー内容
#             pass
#         else:
#             for error_field, detail_list in value.items():
#                 for error_detail in detail_list:
#                     logger.info("エラー内容")
#                     logger.info(error_detail)
#                     logger.info(error_detail.__dir__())

#                     try:
#                         msg = ERROR_MSG[key][error_field][e]
#                     except Exception:
#                         result.append()
