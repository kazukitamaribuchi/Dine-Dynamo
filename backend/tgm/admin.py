from django.contrib import admin

from .models import Facebook, Instagram, Twitter, User

admin.site.register(User)
admin.site.register(Instagram)
admin.site.register(Facebook)
admin.site.register(Twitter)
