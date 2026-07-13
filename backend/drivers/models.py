from django.db import models
import uuid


class Driver(models.Model):

    STATUS_CHOICES = [
        ("AVAILABLE", "Available"),
        ("DRIVING", "Driving"),
        ("RESTING", "Resting"),
    ]

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    first_name = models.CharField(max_length=100)

    last_name = models.CharField(max_length=100)

    email = models.EmailField(unique=True)

    phone = models.CharField(max_length=15)

    license_number = models.CharField(
        max_length=50,
        unique=True
    )

    license_expiry = models.DateField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="AVAILABLE",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"