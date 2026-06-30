from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Fleet
from .serializers import FleetSerializer


class FleetViewSet(viewsets.ModelViewSet):

    queryset = Fleet.objects.all().order_by("-created_at")

    serializer_class = FleetSerializer

    permission_classes = [IsAuthenticated]