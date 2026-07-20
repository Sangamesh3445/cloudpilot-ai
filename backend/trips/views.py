from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from services.trip_status_service import TripStatusService
from .models import Trip
from .serializers import TripSerializer


class TripViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing trips.
    """

    queryset = (
        Trip.objects.select_related(
            "fleet",
            "vehicle",
            "driver",
        )
        .all()
        .order_by("-created_at")
    )

    serializer_class = TripSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = [
        "status",
        "fleet",
        "vehicle",
        "driver",
    ]

    search_fields = [
        "current_location",
        "dropoff_location",
    ]

    ordering_fields = [
        "created_at",
        "updated_at",
        "distance_km",
        "duration_hr",
    ]

    ordering = [
        "-created_at",
    ]

    @action(detail=True, methods=["post"])
    def complete(self, request, pk=None):
        trip = self.get_object()

        TripStatusService.complete_trip(trip)

        return Response(
            {"message": "Trip completed successfully."},
            status=status.HTTP_200_OK,
        )