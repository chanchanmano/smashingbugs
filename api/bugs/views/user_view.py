from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny

from bugs.serializers.user_serializer import UserSerializer
from bugs.models.user import User


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "create":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [p() for p in permission_classes]
    
