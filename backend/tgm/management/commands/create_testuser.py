import logging

from django.core.management.base import BaseCommand

from ...models import Instagram, Tenant, TenantSetting, User, UserSetting

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "テスト用アカウントを作成するコマンド"

    def handle(self, *args, **options):
        options.setdefault("interactive", False)

        auth0_id = "google-oauth2|103115413586892783733"
        auth0_name = ""

        username = "kk tt"
        email = "kazuki.tamaribuchi@gmail.com"
        password = "testAa1@"

        try:
            user_data = {
                "auth0_id": auth0_id,
                "auth0_name": auth0_name,
                "username": username,
                "email": email,
                "password": password,
            }

            try:
                User.objects.get(auth0_id=auth0_id)
            except User.DoesNotExist:
                logger.debug("テストアカウントを作成します。")

                user = User.objects.create(**user_data)

                tenant = Tenant.objects.create(user=user, name="鉄板焼 ぼんの")

                Instagram.objects.create(
                    tenant=tenant,
                    business_account_id="17841403279193745",
                    name="kazuki_tamaribuchi",
                    username="kazuki tamaribuchi",
                    access_token="EAALviXTZBIO4BO6GanNX1qcZB1AgddRZBOyG5LQPnzB2aARz5MQdpPMAJOjRwJFxH5ZA72BSZBoitJEhGlCYMFkvYA90ZA9U9OLkkxHiQX9WYon0jweLh3IQOdmbfUc50kQCZCJA3XzTp8lG9HQktaNsp33IZBratGDHkKLj44aewE1OUJNux9fOBlgDmWD1kfEZD",
                )

                UserSetting.objects.create(
                    user=user,
                )

                TenantSetting.objects.create(
                    tenant=tenant,
                )

        except Exception as e:
            logger.error("テストデータ作成に失敗しました")
            logger.error(e)
