from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    """
    Global exception handler for DRF.
    Returns a consistent response structure for all API errors.
    """

    response = exception_handler(exc, context)

    if response is None:
        return response

    message = "Request failed."

    if response.status_code == 400:
        message = "Validation Error"

    elif response.status_code == 401:
        message = "Authentication credentials were not provided."

    elif response.status_code == 403:
        message = "You do not have permission to perform this action."

    elif response.status_code == 404:
        message = "Requested resource was not found."

    elif response.status_code == 405:
        message = "Method not allowed."

    elif response.status_code >= 500:
        message = "Internal server error."

    response.data = {
        "success": False,
        "status_code": response.status_code,
        "message": message,
        "errors": response.data,
    }

    return response