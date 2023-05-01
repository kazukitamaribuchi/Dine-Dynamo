from django.urls import path, include
from . import views, viewsets
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

app_name = "tgm"

urlpatterns = [
    path("", include(router.urls)),
]
