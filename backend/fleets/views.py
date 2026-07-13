from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Fleet
from .serializers import FleetSerializer


class FleetViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing fleets.
    """

    queryset = Fleet.objects.all().order_by("fleet_name")
    serializer_class = FleetSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = [
        "status",
    ]

    search_fields = [
        "fleet_name",
        "fleet_code",
        "manager_name",
    ]

    ordering_fields = [
        "fleet_name",
        "fleet_code",
        "created_at",
        "updated_at",
    ]

    ordering = [
        "fleet_name",
    ]