from django.db import models
from core import settings
from bugs.models.team_member import TeamMember
from core.base_model import BaseModel


class Team(BaseModel):

    name = models.CharField(max_length=500)
    organization = models.ForeignKey("bugs.Organization", on_delete=models.CASCADE, related_name="team_organization")
    members = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="teams",
        through=TeamMember   
    )

    class Meta:
        db_table="Team"
        constraints = [
            models.UniqueConstraint(
                fields=["name", "organization"], name="unique_team_per_org"
            )
        ]
    
    def __str__(self):
        return f"${self.name} of ${self.organization.name}"