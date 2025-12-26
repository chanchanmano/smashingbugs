from rest_framework.views import APIView
from rest_framework.response import Response

from bugs.models.organization import Organization
from bugs.serializers.organization_serializer import OrganizationSerializer

class OrganizationView(APIView):
    """A view to get organization data"""

    authentication_classes = []
    permission_classes = []
    http_method_names=["get","post"]

    def get(self, request, *args, **kwargs):
        """Return all the organizations serialized"""
        serializer = OrganizationSerializer(Organization.objects.all(), many=True)
        return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        """An endpoint to create an Org"""
        payload = request.data
        if not payload.get("name") and not payload.get("id"):
            return Response(data={"msg":"Cannot create an organization without a valid name"},status=400)
        
        identifier = "name" if not payload.get("id") else "id"
        if not payload.get(identifier):
            return Response(data={"msg":"Invalid data sent to create an organization"},status=400)
        
        organization, is_create = Organization.objects.get_or_create(**{identifier:payload.get(identifier)})
        serializer = OrganizationSerializer(organization)
        return Response(serializer.data)