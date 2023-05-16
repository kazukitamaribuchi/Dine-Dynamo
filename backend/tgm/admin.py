from django.contrib import admin

from .models import AccessToken, User

admin.site.register(User)
admin.site.register(AccessToken)
