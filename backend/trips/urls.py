from django.urls import path
from .views import test_api, plan_trip

urlpatterns = [
    path('test/', test_api),
    path('plan-trip/', plan_trip),
]