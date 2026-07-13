import uuid

from django.db import models


class Fleet(models.Model):
    class Status(models.TextChoices):
        ACTIVE = "ACTIVE", "Active"
        INACTIVE = "INACTIVE", "Inactive"
        MAINTENANCE = "MAINTENANCE", "Maintenance"

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    fleet_name = models.CharField(
        max_length=100
    )

    fleet_code = models.CharField(
        max_length=20,
        unique=True
    )

    description = models.TextField(
        blank=True,
        null=True
    )

    manager_name = models.CharField(
        max_length=100
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.ACTIVE
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        db_table = "fleets"
        ordering = ["fleet_name"]
        verbose_name = "Fleet"
        verbose_name_plural = "Fleets"

    def __str__(self):
        return f"{self.fleet_name} ({self.fleet_code})"