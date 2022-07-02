from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import RegisterUserSerializer

from django.contrib.auth import get_user_model


User = get_user_model()


class RegisterUser(APIView):
    serializer = RegisterUserSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        data = request.data
        serializer = self.serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
