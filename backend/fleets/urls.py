from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import FleetViewSet

router = DefaultRouter()
router.register(r"fleets", FleetViewSet, basename="fleet")

urlpatterns = [
    path("", include(router.urls)),
]