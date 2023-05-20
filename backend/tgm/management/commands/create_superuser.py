import logging

from django.contrib.auth.management.commands import createsuperuser

from ...models import User

logger = logging.getLogger(__name__)


class Command(createsuperuser.Command):
    help = "管理者アカウントを作成するコマンド"

    def handle(self, *args, **options):
        options.setdefault("interactive", False)

        auth0_id = "admin"
        auth0_name = "admin"

        username = "admin"
        email = "admin@gmail.com"
        password = "adminAa1@"

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
                User.objects.get(auth0_id=username)
            except User.DoesNotExist:
                logger.debug("管理者アカウントを作成します。")

                self.UserModel._default_manager.db_manager(database).create_superuser(
                    **user_data
                )

        except Exception as e:
            logger.error(e)
