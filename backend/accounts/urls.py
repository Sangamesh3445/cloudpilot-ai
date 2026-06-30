from django.urls import path
from .views import RegisterView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Register
    path("register/", RegisterView.as_view(), name="auth_register"),

    # Login
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),

    # Refresh Token
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]