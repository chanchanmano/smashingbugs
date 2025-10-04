from rest_framework import serializers
from bugs.models.user import User


class UserSerializer(serializers.ModelSerializer):
    """A generic serializer for user model"""

    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'role']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
    