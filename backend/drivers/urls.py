from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import DriverViewSet

router = DefaultRouter()

router.register("drivers", DriverViewSet)

urlpatterns = [
    path("", include(router.urls)),
]