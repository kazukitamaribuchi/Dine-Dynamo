import datetime
import logging
import os
from datetime import timedelta
from pathlib import Path

import environ
from corsheaders.defaults import default_headers

# TODO envの扱い方
# env = environ.Env()
# env.read_env("./env")

BASE_DIR = Path(__file__).resolve().parent.parent


LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "simple": {
            "format": """%(levelname)s %(asctime)s %(pathname)s:%(funcName)s 行数:%(lineno)s:%(lineno)s
%(message)s"""
        }
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
        # "debug": {
        #     "level": "DEBUG",
        #     "class": "logging.FileHandler",
        #     "filename": os.path.join(BASE_DIR, "log/debug.log"),
        #     "formatter": "simple",
        # },
        # "info": {
        #     "level": "INFO",
        #     "class": "logging.FileHandler",
        #     "filename": os.path.join(BASE_DIR, "log/info.log"),
        #     "formatter": "simple",
        # },
        # "warning": {
        #     "level": "WARNING",
        #     "class": "logging.FileHandler",
        #     "filename": os.path.join(BASE_DIR, "log/warning.log"),
        #     "formatter": "simple",
        # },
        # "error": {
        #     "level": "ERROR",
        #     "class": "logging.FileHandler",
        #     "filename": os.path.join(BASE_DIR, "log/error.log"),
        #     "formatter": "simple",
        # },
    },
    "root": {
        "handlers": ["console"],
        "level": "DEBUG",
    },
}


logger = logging.getLogger(__name__)


# SECRET_KEY = env("SECRET_KEY")
SECRET_KEY = os.environ.get("SECRET_KEY")


DEBUG = True
ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework_simplejwt",
    "django_filters",
    "tgm.apps.TgmConfig",
    "corsheaders",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

SIMPLE_JWT = {
    # アクセストークン(1時間)
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=1),
    # リフレッシュトークン(3日)
    "REFRESH_TOKEN_LIFETIME": timedelta(days=3),
    # 認証タイプ
    "AUTH_HEADER_TYPES": ("Bearer",),
    # 認証トークン
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "USER_ID_FIELD": "auth0_id",
}


REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.BasicAuthentication",
    ],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
    ],
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle",
    ],
    # 'DEFAULT_THROTTLE_RATES': {
    #     'anon': '100/day',
    #     'user': '5/sec',
    # }
}

JWT_AUTH = {
    "JWT_VERIFY": True,
    "JWT_VERIFY_EXPIRATION": True,
    "JWT_LEEWAY": 0,
    # Sessionの保存期間を設定(24時間)
    "JWT_EXPIRATION_DELTA": datetime.timedelta(seconds=86400),
    # 'JWT_EXPIRATION_DELTA': datetime.timedelta(seconds=604800), # Sessionの保存期間を設定(1週間)
    "JWT_ALLOW_REFRESH": True,
    "JWT_REFRESH_EXPIRATION_DELTA": datetime.timedelta(days=1),
    # 'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(seconds=1),
}

ROOT_URLCONF = "api.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "api.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Stripeのパブリックキー
STRIPE_PUBLIC_KEY = os.environ.get("STRIPE_PUBLIC_KEY")
# Stripeのシークレットキー
STRIPE_SECRET_KEY = os.environ.get("STRIPE_SECRET_KEY")
# StripeのWebhookのシークレットキー
STRIPE_WEBHOOK_SECRET = os.environ.get("STRIPE_WEBHOOK_SECRET")


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "ja"

TIME_ZONE = "Asia/Tokyo"

USE_I18N = True

USE_L10N = True

USE_TZ = True


AUTH_USER_MODEL = "tgm.User"

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "static/"

STATICFILES_DIRS = [os.path.join(BASE_DIR, "staticfiles")]
STATIC_ROOT = os.path.join(BASE_DIR, "static")

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Email設定
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_HEADERS = default_headers + ("access-control-allow-origin",)
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = ("http://localhost:8000",)

# CELERY_BROKER_URL = "redis://localhost:6379/0"
# CELERY_RESULT_BACKEND = "redis://localhost:6379/0"
# CELERY_ACCEPT_CONTENT = ["json"]
# CELERY_TASK_SERIALIZER = "json"
# CELERY_RESULT_SERIALIZER = "json"
# CELERY_TIMEZONE = "UTC"
CELERY_BROKER_URL = "redis://redis:6379/0"
# Celery Configuration Options
CELERY_TIMEZONE = "Asia/Tokyo"
CELERY_TASK_TRACK_STARTED = True
CELERY_TASK_TIME_LIMIT = 30 * 60
