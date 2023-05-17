import logging

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.core.mail import send_mail
from django.db import models
from django.utils.translation import gettext_lazy as _

from .core.models import AbstractSNSInfomation, AbstractTimeStamp

logger = logging.getLogger(__name__)


class UserManager(BaseUserManager):
    """カスタマイズしたユーザーマネージャー."""

    use_in_migrations = True

    def _create_user(self, username, email, password, **extra_fields):
        if not username:
            raise ValueError("ユーザーネームは必須項目です。")

        email = self.normalize_email(email)
        username = self.model.normalize_username(username)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)

        return self._create_user(username, email, password, **extra_fields)

    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin, AbstractTimeStamp):
    """ユーザ情報テーブル.

    auth0_id: auth0のsub(auth0_id)
    username: 初期値はauth0のユーザーネーム
    password: パスワード(暗号化された値)
    email: メールアドレス
    address: 住所

    is_staff: スタッフユーザー
    is_superuser: 管理者

    deleted: 削除フラグ
    deleted_at: 削除日時
    """

    auth0_id = models.CharField(_("Auth0Id"), max_length=255, unique=True)
    auth0_name = models.CharField(_("Username"), max_length=70, blank=True, null=True)

    username = models.CharField(
        _("Username"), max_length=70, unique=True, blank=True, null=True
    )
    email = models.EmailField(_("Email"), max_length=70, unique=True)
    address = models.CharField(_("Address"), max_length=100, blank=True, null=True)

    is_staff = models.BooleanField(
        _("Staff Status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )

    deleted = models.BooleanField(
        _("Delete Flag"),
        default=False,
        help_text=_("Designates whether the user was deleted or not"),
    )

    deleted_at = models.DateTimeField(_("Deleted Date"), blank=True, null=True)

    objects = UserManager()

    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["email"]

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return self.username

    def get_username(self):
        return self.username

    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)


class Instagram(AbstractTimeStamp, AbstractSNSInfomation):
    """ユーザーのInstagramの情報.

    business_account_id: グラフAPIに必要なビジネスid
    """

    user = models.ManyToManyField(User)
    business_account_id = models.TextField(unique=True)


class Facebook(AbstractTimeStamp, AbstractSNSInfomation):
    """ユーザーのFacebookの情報."""

    user = models.ManyToManyField(User)


class Twitter(AbstractTimeStamp, AbstractSNSInfomation):
    """ユーザーのTwitterの情報."""

    user = models.ManyToManyField(User)
