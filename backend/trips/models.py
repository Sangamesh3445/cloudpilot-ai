from django.db import models
import uuid

from drivers.models import Driver
from vehicles.models import Vehicle
from fleets.models import Fleet


class Trip(models.Model):

    STATUS_CHOICES = [
        ("PLANNED", "Planned"),
        ("ASSIGNED", "Assigned"),
        ("STARTED", "Started"),
        ("ON_ROUTE", "On Route"),
        ("COMPLETED", "Completed"),
        ("CANCELLED", "Cancelled"),
    ]

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    fleet = models.ForeignKey(
        Fleet,
        on_delete=models.CASCADE,
        related_name="trips",
    )

    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.CASCADE,
        related_name="trips",
    )

    driver = models.ForeignKey(
        Driver,
        on_delete=models.CASCADE,
        related_name="trips",
    )

    current_location = models.CharField(max_length=255)

    dropoff_location = models.CharField(max_length=255)

    distance_km = models.FloatField(default=0)

    duration_hr = models.FloatField(default=0)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PLANNED",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.current_location} → {self.dropoff_location}"