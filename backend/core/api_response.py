from rest_framework.response import Response
from rest_framework import status


class APIResponse:

    @staticmethod
    def success(
        data=None,
        message="Success",
        status_code=status.HTTP_200_OK,
    ):
        return Response(
            {
                "success": True,
                "status_code": status_code,
                "message": message,
                "data": data,
            },
            status=status_code,
        )

    @staticmethod
    def error(
        message="Error",
        errors=None,
        status_code=status.HTTP_400_BAD_REQUEST,
    ):
        return Response(
            {
                "success": False,
                "status_code": status_code,
                "message": message,
                "errors": errors,
            },
            status=status_code,
        )