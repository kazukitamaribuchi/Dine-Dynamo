import logging

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.core.mail import send_mail
from django.db import models
from django.utils.translation import gettext_lazy as _

from .core.models import AbstractTimeStamp

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

    auth0_id = models.CharField(_("Auth0Id"), max_length=255, primary_key=True)
    auth0_name = models.CharField(_("Auth0Name"), max_length=70, blank=True, null=True)

    username = models.CharField(
        _("Username"), max_length=70, unique=True, blank=True, null=True
    )
    email = models.EmailField(_("Email"), max_length=70, unique=True)
    email_verified = models.BooleanField(
        _("whether the email is verified or not"), default=False
    )

    phone_number = models.CharField(
        _("Phone Number"), max_length=15, blank=True, null=True
    )
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


class Tenant(AbstractTimeStamp):
    """ユーザー毎のレストランや店など.

    レストランや店はそれぞれSNS1つにつき、アカウント1つと紐づく
    """

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_tenants"
    )
    name = models.CharField(max_length=100)

    remarks = models.TextField(blank=True, null=True)

    # TODO 住所などはいる？

    def __str__(self):
        return self.name


class UserSetting(AbstractTimeStamp):
    """ユーザー毎の設定."""

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # TODO どのテナントを選択中か

    # TODO 通知の有無や頻度
    # TODO 課金タイプ

    def __str__(self):
        return self.user.username


class TenantSetting(AbstractTimeStamp):
    """テナント毎の設定.

    TODO 今後テナント毎で設定項目を増やしていく
    """

    tenant = models.OneToOneField(Tenant, on_delete=models.CASCADE)

    def __str__(self):
        return self.tenant.name


class LinkedService(models.Model):
    """連携サービス一覧."""

    SERVICES_CHOICES = (
        ("instagram", "Instagram"),
        ("facebook", "Facebook"),
        ("twitter", "Twitter"),
        ("google business profile", "Google Business Profile"),
    )
    name = models.CharField(max_length=50, choices=SERVICES_CHOICES)

    def __str__(self):
        return self.name


class Notification(AbstractTimeStamp):
    """通知情報."""

    tenant = models.ForeignKey(
        Tenant, on_delete=models.CASCADE, related_name="tenant_notifications"
    )
    service = models.ForeignKey(
        LinkedService, on_delete=models.CASCADE, related_name="service_notifications"
    )

    LEVEL_CHOICES = (
        (1, "1"),
        (2, "2"),
        (3, "3"),
        (4, "4"),
        (5, "5"),
    )
    level = models.IntegerField(choices=LEVEL_CHOICES)
    read = models.BooleanField(default=False)


class Instagram(AbstractTimeStamp):
    """ユーザーのInstagramの情報.

    business_account_id: グラフAPIに必要なビジネスid
    access_token: アカウント毎に発行した無期限のトークン

    token: 無期限トークンより権限の強い期限付きのトークン TODO
    """

    tenant = models.OneToOneField(Tenant, on_delete=models.CASCADE)
    business_account_id = models.TextField(unique=True)
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100)

    access_token = models.CharField(max_length=250)

    def __str__(self):
        return self.tenant.name


class InstagramMediaInsight(AbstractTimeStamp):
    """ユーザーのメディアのインサイト.

    メディアはAPI取得出来るので保存しない。
    削除されたらそのメディアの情報は取得できないで良しとする。

    将来的に時間毎のインサイトとか分析するためにインサイトをDB保存する。

    最初は日次取得
    """

    media_id = models.CharField(max_length=30)
    timestamp = models.DateTimeField()

    engagement = models.PositiveIntegerField()
    impressions = models.PositiveIntegerField()
    reach = models.PositiveIntegerField()
    saved = models.PositiveIntegerField()
    video_views = models.PositiveIntegerField()
    carousel_album_engagement = models.PositiveIntegerField()
    carousel_album_impressions = models.PositiveIntegerField()
    carousel_album_reach = models.PositiveIntegerField()
    carousel_album_saved = models.PositiveIntegerField()
    carousel_album_video_views = models.PositiveIntegerField()


# TODO ビジネスアカウント変更後に投稿→取得テスト後設計
# class InstagramReelInsight(AbstractTimeStamp):
#     """ユーザーのリールのインサイト."""

#     media_id = models.CharField(max_length=30)
#     timestamp = models.DateTimeField()


class InstagramStory(AbstractTimeStamp):
    """ユーザーのStory.

    24hで消えてしまうので、DB保存する

    1h毎のインサイトとかはまずは取得せず、1ストーリー1行とする。
    APIで取得時に書き込み、DBのデータを画面側に返す。
    """

    account = models.ForeignKey(
        Instagram, on_delete=models.CASCADE, related_name="instagram_stories"
    )
    story_id = models.CharField(max_length=30)
    timestamp = models.DateTimeField()

    # thumbnail = # TODO ストレージサービスと連携
    # media = # TODO 映像は残す？
    caption = models.TextField()


class InstagramStoryInsight(AbstractTimeStamp):
    """ユーザーのStoryのインサイト.

    将来的に1h毎のインサイトとか保存出来るように別テーブルで管理
    """

    story = models.ForeignKey(
        InstagramStory,
        on_delete=models.CASCADE,
        related_name="instagram_story_insights",
    )
    timestamp = models.DateTimeField()

    like = models.PositiveIntegerField()
    exists = models.PositiveIntegerField()
    impressions = models.PositiveIntegerField()
    reach = models.PositiveIntegerField()
    replies = models.PositiveIntegerField()
    taps_forward = models.PositiveIntegerField()
    taps_back = models.PositiveIntegerField()


class InstagramStoryComment(AbstractTimeStamp):
    """DBに保存する項目のコメント.

    ストーリーは消えてしまうためコメントも取得に保存更新
    """

    story = models.ForeignKey(
        InstagramStory,
        on_delete=models.CASCADE,
        related_name="instagram_story_comments",
    )
    timestamp = models.DateTimeField()

    comment_id = models.CharField(max_length=30)
    username = models.CharField(max_length=100, null=True, blank=True)  # 個別に取得しなきゃ取れない
    text = models.TextField()


class Facebook(AbstractTimeStamp):
    """ユーザーのFacebookの情報."""

    tenant = models.OneToOneField(Tenant, on_delete=models.CASCADE)

    def __str__(self):
        return self.tenant.name


class Twitter(AbstractTimeStamp):
    """ユーザーのTwitterの情報."""

    tenant = models.OneToOneField(Tenant, on_delete=models.CASCADE)

    def __str__(self):
        return self.tenant.name
