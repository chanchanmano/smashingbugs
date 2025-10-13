from rest_framework.views import APIView
from rest_framework.response import Response

from bugs.models.organization import Organization
from bugs.serializers.organization_serializer import OrganizationSerializer

class OrganizationView(APIView):
    """A view to get organization data"""

    authentication_classes = []
    permission_classes = []
    http_method_names=["get"]

    def get(self, request, *args, **kwargs):
        """Return all the organizations serialized"""
        serializer = OrganizationSerializer(Organization.objects.all(), many=True)
        return Response(serializer.data)


