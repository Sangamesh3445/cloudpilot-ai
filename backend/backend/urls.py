from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="CloudPilot AI API",
        default_version="v1",
        description="Intelligent Fleet Operations Platform",
        contact=openapi.Contact(email="sangamesh@example.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),

    # Authentication
    path("api/auth/", include("accounts.urls")),

    # Driver Module
    path("api/", include("drivers.urls")),

    # Vehicle Module
    path("api/", include("vehicles.urls")),

    # Fleet Module
    path("api/", include("fleets.urls")),

    # Trip Module
    path("api/", include("trips.urls")),

    # Swagger
    re_path(
        r"^swagger/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),

    # ReDoc
    re_path(
        r"^redoc/$",
        schema_view.with_ui("redoc", cache_timeout=0),
        name="schema-redoc",
    ),
]