from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from core.api_response import APIResponse
from .services import DashboardService


class DashboardAPIView(APIView):

    permission_classes = [
        AllowAny,
    ]

    def get(self, request):

        data = DashboardService.get_dashboard_data()

        return APIResponse.success(
            data=data,
            message="Dashboard data retrieved successfully.",
        )