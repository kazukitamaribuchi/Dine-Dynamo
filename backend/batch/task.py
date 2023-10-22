import requests
from celery import shared_task

from ..tgm.models import User
from ..tgm.utils.instagram import InstagramAPIHandler
