from django.contrib import admin

from .models import Fleet


@admin.register(Fleet)
class FleetAdmin(admin.ModelAdmin):
    list_display = (
        "fleet_name",
        "fleet_code",
        "manager_name",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
        "created_at",
    )

    search_fields = (
        "fleet_name",
        "fleet_code",
        "manager_name",
    )

    ordering = (
        "fleet_name",
    )

    readonly_fields = (
        "id",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Fleet Information",
            {
                "fields": (
                    "id",
                    "fleet_name",
                    "fleet_code",
                    "description",
                    "manager_name",
                    "status",
                )
            },
        ),
        (
            "Audit Information",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )