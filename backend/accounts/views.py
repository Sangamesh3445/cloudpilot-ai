from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from drf_yasg.utils import swagger_auto_schema

from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import (
    RegisterSerializer,
    CustomTokenObtainPairSerializer,
    UserProfileSerializer,
    LogoutSerializer,
)


class RegisterView(generics.CreateAPIView):

    serializer_class = RegisterSerializer

    permission_classes = [
        permissions.AllowAny,
    ]

    @swagger_auto_schema(
        operation_summary="Register User",
        operation_description="Register a new user account.",
        tags=["Authentication"],
        request_body=RegisterSerializer,
        responses={
            201: RegisterSerializer,
            400: "Validation Error",
        },
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class LoginView(TokenObtainPairView):

    serializer_class = CustomTokenObtainPairSerializer

    @swagger_auto_schema(
        operation_summary="Login",
        operation_description="Authenticate user and generate JWT tokens.",
        tags=["Authentication"],
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class UserProfileView(APIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    @swagger_auto_schema(
        operation_summary="Current User",
        operation_description="Returns the authenticated user's profile.",
        tags=["Authentication"],
        responses={
            200: UserProfileSerializer,
            401: "Unauthorized",
        },
    )
    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)


class LogoutView(APIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    @swagger_auto_schema(
        operation_summary="Logout",
        operation_description="Blacklist the refresh token.",
        tags=["Authentication"],
        request_body=LogoutSerializer,
        responses={
            205: "Logged out successfully.",
            400: "Invalid refresh token.",
        },
    )
    def post(self, request):

        serializer = LogoutSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(
            {
                "message": "Logged out successfully."
            },
            status=status.HTTP_205_RESET_CONTENT,
        )