from file.tasks import create_user_info

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics, status, serializers
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.authentication import AUTH_HEADER_TYPES
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from .serializers import RegisterUserSerializer, UserSerializer

from django.utils.module_loading import import_string
from django.contrib.auth import get_user_model


User = get_user_model()


class RegisterUser(APIView):
    serializer = RegisterUserSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                status=status.HTTP_201_CREATED,
                data={"success": True, "message": "User created successfully"},
            )
        return Response(
            status=status.HTTP_400_BAD_REQUEST,
            data={"success": False, "message": serializer.errors},
        )


class CustomTokenViewBase(generics.GenericAPIView):
    permission_classes = ()
    authentication_classes = ()

    serializer_class = None
    _serializer_class = ""

    www_authenticate_realm = "api"

    def get_serializer_class(self):
        """
        If serializer_class is set, use it directly. Otherwise get the class from settings.
        """

        if self.serializer_class:
            return self.serializer_class
        try:
            return import_string(self._serializer_class)
        except ImportError:
            msg = "Could not import serializer '%s'" % self._serializer_class
            raise ImportError(msg)

    def get_authenticate_header(self, request):
        return '{} realm="{}"'.format(
            AUTH_HEADER_TYPES[0],
            self.www_authenticate_realm,
        )

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        create_user_info.delay()

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class TokenObtainPairView(CustomTokenViewBase):
    """
    Takes a set of user credentials and returns an access and refresh JSON web
    token pair to prove the authentication of those credentials.
    """

    _serializer_class = api_settings.TOKEN_OBTAIN_SERIALIZER


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        print("request.data: ", request.data)
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {
                    "access_token": token.key,
                    "success": True,
                    "message": "User authenticated successfully",
                },
                status=status.HTTP_200_OK,
            )
        print("serializer.is_not_valid(): ", serializer.is_valid())
        return Response(
            status=status.HTTP_400_BAD_REQUEST,
            data={"success": False, "message": "User authentication failed"},
        )


class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return User.objects.exclude(uuid=self.request.user.uuid)
