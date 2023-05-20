import logging

from django.core.management.base import BaseCommand

from ...models import Instagram, User

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "テスト用アカウントを作成するコマンド"

    def handle(self, *args, **options):
        options.setdefault("interactive", False)

        auth0_id = "test"
        auth0_name = "test"

        username = "test"
        email = "test@gmail.com"
        password = "testAa1@"

        database = options.get("database")

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

                Instagram.objects.create(
                    user=user,
                    token="EAACDWqv1OZCkBAIJvge4ZCysb1v9VczYTGJtS1D2IOmlYqkvcrb9nyZBqx7CBSirDgsZAL35C5JA5WLXlQk4Qlb2SUGxXnJkF5xLPJB6qTZBZClSK6mtAqO6N2qXAw8hPdwqezxz5PLMh8amMDnFbDR9sZBGpM7CXUUtg1ShM9kkKRqfjPeZC51R9ZBjoZBJC31WQZD",
                    business_account_id="17841459125073071",
                )

        except Exception as e:
            logger.error(e)
