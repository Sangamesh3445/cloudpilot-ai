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
    def create(self, request, *args, **kwargs):

        print("\n========== REQUEST DATA ==========")
        print(request.data)

        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            print("\n========== SERIALIZER ERRORS ==========")
            print(serializer.errors)
            return Response(serializer.errors, status=400)

        try:
            self.perform_create(serializer)
        except Exception as e:
            print("\n========== SERVICE ERROR ==========")
            print(type(e))
            print(e)
            raise

        return Response(serializer.data, status=201)

    @action(detail=True, methods=["post"])
    def complete(self, request, pk=None):
        trip = self.get_object()

        TripStatusService.complete_trip(trip)

        return Response(
            {"message": "Trip completed successfully."},
            status=status.HTTP_200_OK,
        )