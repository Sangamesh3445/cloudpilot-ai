from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication

from .models import Driver
from .serializers import DriverSerializer


class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all().order_by("-created_at")
    serializer_class = DriverSerializer

    authentication_classes = [
        SessionAuthentication,
    ]

    permission_classes = [
        IsAuthenticated,
    ]