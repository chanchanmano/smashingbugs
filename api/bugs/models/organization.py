from django.db import models

from core.base_model import BaseModel


class Organization(BaseModel):
    """Organization model to represent various orgs and teams"""

    name = models.CharField(max_length=300)

    class Meta:
        db_table="Organization"

    def __str__(self):
        return f"{self.name}"