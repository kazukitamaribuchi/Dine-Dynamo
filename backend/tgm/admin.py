from django.contrib import admin

from .models import (
    Facebook,
    Instagram,
    LinkedService,
    Notification,
    Tenant,
    TenantSetting,
    Twitter,
    User,
    UserSetting,
)

admin.site.register(User)
admin.site.register(Instagram)
admin.site.register(Facebook)
admin.site.register(Twitter)
admin.site.register(LinkedService)
admin.site.register(Notification)
admin.site.register(Price)
admin.site.register(Product)
admin.site.register(Tenant)
admin.site.register(TenantSetting)
admin.site.register(UserSetting)
