from django.db import models
from django.contrib.auth.models import AbstractUser
from core.base_model import BaseModel


class User(BaseModel, AbstractUser):
    ROLE_CHOICES = [
        ("USER", "User"),
        ("ADMIN", "Admin"),
    ]

    username=None # leaving out abstractuser's username

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="USER")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS=["name"]

    def __str__(self):
        return f"{self.name} ({self.email})"