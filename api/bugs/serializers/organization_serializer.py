
from rest_framework import serializers

from bugs.models.organization import Organization

class OrganizationSerializer(serializers.ModelSerializer):

    class Meta:
        model=Organization
        fields="__all__"

