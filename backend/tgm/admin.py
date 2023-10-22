from django.contrib import admin

from .models import (
    Facebook,
    Instagram,
    InstagramMediaInsight,
    InstagramStory,
    InstagramStoryComment,
    InstagramStoryInsight,
    LinkedService,
    Notification,
    Tenant,
    TenantSetting,
    Twitter,
    User,
    UserSetting,
)

admin.site.register(User)
admin.site.register(UserSetting)

admin.site.register(Tenant)
admin.site.register(TenantSetting)

admin.site.register(Instagram)
admin.site.register(InstagramMediaInsight)
admin.site.register(InstagramStory)
admin.site.register(InstagramStoryComment)
admin.site.register(InstagramStoryInsight)

admin.site.register(Facebook)

admin.site.register(Twitter)

admin.site.register(LinkedService)

admin.site.register(Notification)
