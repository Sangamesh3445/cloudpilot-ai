from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Vehicle
from .serializers import VehicleSerializer


class VehicleViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing vehicles.
    """

    queryset = (
        Vehicle.objects.select_related(
            "fleet",
            "assigned_driver",
        )
        .all()
        .order_by("vehicle_number")
    )

    serializer_class = VehicleSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = [
        "status",
        "fuel_type",
        "vehicle_type",
    ]

    search_fields = [
        "vehicle_number",
        "manufacturer",
        "model",
    ]

    ordering_fields = [
        "vehicle_number",
        "manufacturer",
        "manufacturing_year",
        "created_at",
    ]

    ordering = [
        "vehicle_number",
    ]