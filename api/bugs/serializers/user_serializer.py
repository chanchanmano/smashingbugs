from rest_framework import serializers
from bugs.models.user import User
from bugs.models.organization import Organization


class UserSerializer(serializers.ModelSerializer):

    organization_id = serializers.IntegerField(required=False, write_only=True)
    organization_name = serializers.CharField(required=False, write_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "name",
            "email",
            "role",
            "organization",
            "organization_id",
            "organization_name",
            "password",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "organization": {"read_only": True},
        }

    def create(self, validated_data):
        org_id = validated_data.pop("organization_id", None)
        org_name = validated_data.pop("organization_name", None)

        if not org_id and not org_name:
            raise serializers.ValidationError(
                "You must provide either organization_id or organization_name"
            )

        if org_id:
            try:
                organization = Organization.objects.get(id=org_id)
            except Organization.DoesNotExist:
                raise serializers.ValidationError(
                    {"organization_id": "Invalid organization id"}
                )
        else:
            organization = Organization.objects.create(name=org_name)

        validated_data["organization"] = organization
        password = validated_data.pop("password", None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
            
        user.save()
        return user
