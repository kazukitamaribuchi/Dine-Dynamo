from rest_framework import authentication, filters, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Facebook, Instagram, Twitter, User


class InstagramViewSet(viewsets.ViewSet):
    """Instagram Viewset."""

    permission_classes = (permissions.AllowAny,)

    def list(self, request):
        return Response({"message": "Done"}, status=status.HTTP_200_OK)


class FacebookViewSet(viewsets.ViewSet):
    """Facebook Viewset."""

    permission_classes = (permissions.AllowAny,)

    def list(self, request):
        return Response({"message": "Done"}, status=status.HTTP_200_OK)


class TwitterViewSet(viewsets.ViewSet):
    """Twitter Viewset."""

    permission_classes = (permissions.AllowAny,)

    def list(self, request):
        return Response({"message": "Done"}, status=status.HTTP_200_OK)
