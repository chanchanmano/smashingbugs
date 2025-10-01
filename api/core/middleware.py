from django.utils.deprecation import MiddlewareMixin

class CustomAuthMiddleware(MiddlewareMixin):
    """
    Currently a dummy middleware.
    JWT auth is already handled by DRF + SimpleJWT,
    but this keeps a hook for extra control.
    """

    def process_request(self, request):
        # Right now, do nothing. For extension later
        return None

    def process_response(self, request, response):
        response["X-Custom-Middleware"] = "active"
        return response
