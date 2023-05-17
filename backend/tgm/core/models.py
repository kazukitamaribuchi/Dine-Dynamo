from django.db import models
from django.utils.translation import gettext_lazy as _


class AbstractTimeStamp(models.Model):
    """作成/更新日時.

    created_at: 作成日時
    updated_at: 更新日時
    """

    created_at = models.DateTimeField(_("Created Date"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated Date"), auto_now=True)

    class Meta:
        abstract = True


class AbstractSNSInfomation(models.Model):
    """連携するSNS情報の基礎抽象クラス.

    account_id: SNSのid
    username: SNSのusername

    token: SNSのアクセストークン
    """

    account_id = models.TextField()
    username = models.TextField()

    token = models.TextField(unique=True)

    class Meta:
        abstract = True
