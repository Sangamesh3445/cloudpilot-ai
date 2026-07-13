from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from services.trip_status_service import TripStatusService
from .models import Trip
from .serializers import TripSerializer


class TripViewSet(viewsets.ModelViewSet):

    queryset = Trip.objects.all().order_by("-created_at")
    serializer_class = TripSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=["post"])
    def complete(self, request, pk=None):

        trip = self.get_object()

        TripStatusService.complete_trip(trip)

        return Response(
            {"message": "Trip completed successfully."},
            status=status.HTTP_200_OK,
        )