from rest_framework.serializers import ValidationError


class BaseValidationError(ValidationError):
    """Serializerのvalidationエラーの基礎クラス."""

    code = "invalid"
    msg = "validation error"

    def __str__(self):
        return f"{self.code}: {self.msg}"

    @property
    def data(self) -> dict:
        return {"code": self.code, "msg": self.msg}


class AlreadyLinkedInstagramError(BaseValidationError):
    """既に他のテナントと紐づいているインスタアカウントの場合のエラー."""

    code = "ALREADY_LINKED_INSTAGRAM"
    msg = "このインスタグラムアカウントは既に他のアカウントと紐づいています。"


class LinkInstagramToTenantError(BaseValidationError):
    """テナントとインスタの紐づけエラー."""

    code = "LINK_INSTAGRAM_TO_TENANT_ERROR"
    msg = "テナントとインスタグラムの紐づけに失敗しました。"


class InvalidUserAuth0IdError(BaseValidationError):
    """正しくないauth0_idのためユーザーが取得出来ない時のエラー."""

    code = "INVALID_USER_AUTH0_ID"
    msg = "auth0_Idが正しくないため、ユーザーを取得出来ません。"


class UserNotExistError(BaseValidationError):
    """ユーザーが存在しないエラー."""

    code = "USER_NOT_EXIST"
    msg = "指定されたauth0_idのユーザーが見つかりませんでした。"


class CreateTenantError(BaseValidationError):
    """テナント作成時のエラー."""

    code = "CREATE_TENANT_ERROR"
    msg = "テナント作成時にエラーが発生しました。"


def handle_validation_error() -> BaseValidationError:
    """ValidationError時のレスポンスデータを作成する."""

    return BaseValidationError.data
