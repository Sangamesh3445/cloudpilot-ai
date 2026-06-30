from django.urls import path
from .views import test_api, plan_trip

urlpatterns = [
    path("test/", test_api, name="test-api"),
    path("plan-trip/", plan_trip, name="plan-trip"),
]