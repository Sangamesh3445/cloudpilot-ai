from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Driver
from .serializers import DriverSerializer


class DriverViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing drivers.
    """

    queryset = (
        Driver.objects.all()
        .order_by("first_name")
    )

    serializer_class = DriverSerializer

    permission_classes = [
        IsAuthenticated,
    ]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = [
        "status",
    ]

    search_fields = [
        "first_name",
        "last_name",
        "license_number",
        "phone_number",
    ]

    ordering_fields = [
        "first_name",
        "last_name",
        "created_at",
    ]

    ordering = [
        "first_name",
    ]