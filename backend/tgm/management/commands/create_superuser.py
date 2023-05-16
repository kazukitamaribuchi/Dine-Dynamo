import logging

from django.contrib.auth.management.commands import createsuperuser

logging.basicConfig(
    level=logging.DEBUG,
    format="""%(levelname)s %(asctime)s %(pathname)s:%(funcName)s:%(lineno)s
    %(message)s""",
)

logger = logging.getLogger(__name__)


class Command(createsuperuser.Command):
    help = "Auth0のスーパーユーザーを作成するコマンド"

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

            exists = (
                self.UserModel._default_manager.db_manager(database)
                .filter(username=username)
                .exists()
            )
            if not exists:
                self.UserModel._default_manager.db_manager(database).create_superuser(
                    **user_data
                )

        except Exception as e:
            logger.error(e)
