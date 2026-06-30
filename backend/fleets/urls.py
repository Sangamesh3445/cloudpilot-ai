from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import FleetViewSet

router = DefaultRouter()

router.register("fleets", FleetViewSet)

urlpatterns = [
    path("", include(router.urls)),
]