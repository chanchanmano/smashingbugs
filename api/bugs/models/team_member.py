

from django.db import models
from bugs.models.user import User
from core.base_model import BaseModel


class TeamMember(BaseModel):

    user = models.ForeignKey("bugs.User", on_delete=models.CASCADE)
    team = models.ForeignKey("bugs.Team", on_delete=models.CASCADE)
    role = models.CharField(max_length=100, default="MEMBER")
    joined_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table="TeamMember"

