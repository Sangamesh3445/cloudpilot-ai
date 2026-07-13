from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Driver
from .serializers import DriverSerializer


class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all().order_by("-created_at")
    serializer_class = DriverSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):

        print("=" * 70)
        print("REQUEST USER :", request.user)
        print("REQUEST AUTH :", request.auth)
        print("REQUEST DATA :", request.data)
        print("=" * 70)

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )

        print(serializer.errors)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )