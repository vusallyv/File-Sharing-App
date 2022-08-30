from django.urls import path
from user.api.views import RegisterUser, TokenObtainPairView, UserListView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterUser.as_view(), name='register'),
    path('users/', UserListView.as_view(), name='user_list'),
]

