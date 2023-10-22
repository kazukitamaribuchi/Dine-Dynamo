from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views, viewsets

router = DefaultRouter()
router.register("instagram", viewsets.InstagramViewSet, basename="instagram")
router.register("facebook", viewsets.FacebookViewSet, basename="facebook")
router.register("twitter", viewsets.TwitterViewSet, basename="twitter")
router.register("auth", viewsets.AuthViewSet, basename="auth")
router.register("tenant", viewsets.TenantViewSet, basename="tenant")

router.register("user", viewsets.UserViewSet)

app_name = "tgm"

urlpatterns = [
    path("", include(router.urls)),
]
