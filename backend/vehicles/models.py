from django.db import models
import uuid

from drivers.models import Driver
from fleets.models import Fleet


class Vehicle(models.Model):

    STATUS_CHOICES = [
        ("AVAILABLE", "Available"),
        ("ASSIGNED", "Assigned"),
        ("ON_TRIP", "On Trip"),
        ("MAINTENANCE", "Maintenance"),
    ]

    FUEL_CHOICES = [
        ("DIESEL", "Diesel"),
        ("PETROL", "Petrol"),
        ("CNG", "CNG"),
        ("ELECTRIC", "Electric"),
    ]

    VEHICLE_TYPE_CHOICES = [
        ("TRUCK", "Truck"),
        ("VAN", "Van"),
        ("TRAILER", "Trailer"),
        ("PICKUP", "Pickup"),
    ]

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    vehicle_number = models.CharField(
        max_length=20,
        unique=True
    )

    manufacturer = models.CharField(
        max_length=100
    )

    model = models.CharField(
        max_length=100
    )

    manufacturing_year = models.PositiveIntegerField()

    vehicle_type = models.CharField(
        max_length=20,
        choices=VEHICLE_TYPE_CHOICES
    )

    fuel_type = models.CharField(
        max_length=20,
        choices=FUEL_CHOICES
    )

    capacity_kg = models.PositiveIntegerField()

    assigned_driver = models.ForeignKey(
        Driver,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="vehicles"
    )

    fleet = models.ForeignKey(
        Fleet,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="vehicles"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="AVAILABLE"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.vehicle_number