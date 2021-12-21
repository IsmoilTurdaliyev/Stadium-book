from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView

from .views import *


urlpatterns = [
    path('auth/login', TokenObtainPairView.as_view()),
    path('auth/register', create_user_view),

    path('auth/refresh', TokenRefreshView.as_view()),

    path(
        'users/me', profile_view,
        kwargs={'pk': 'me'}
    )
]
