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
    organization = models.ForeignKey("bugs.Organization", on_delete=models.CASCADE)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS=["name"]

    class Meta:
        db_table="User"

    def __str__(self):
        return f"{self.name} ({self.email})"
    
    @property
    def is_admin(self):
        return 1 if self.role == "ADMIN" else 0