from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .services import DashboardService


class DashboardAPIView(APIView):

    permission_classes = [
        AllowAny,
    ]

    def get(self, request):

        data = DashboardService.get_dashboard_data()

        return Response(data)