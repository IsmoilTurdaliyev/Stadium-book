import secrets

from django.test import TestCase
from django.http import HttpResponse

from accounts.models import User


CREDENTIALS_FOR_LOGIN = {
    "username": "new_user",
    "email": "new_user@mail.com",
    "password": secrets.token_hex(),
    "telephone": "+998919998877"

}

CREDENTIALS_FOR_REGISTER = {
    "username": "django_user_007",
    "password": "**UserDjango007**",
    "email": "django_user@mail.com",
    "telephone": "+998915556677"
}


class CustomTestCase(TestCase):
    """
    Custom `TestCase` class
    """

    def request(
        self,
        endpoint: str,
        method: str = "get",
        data: str = None,
        ** kwargs
    ) -> HttpResponse:
        return getattr(self.client, method.lower())(
            path="/api/v1/" + endpoint,
            format="json",
            data=data,
            **kwargs
        )

    def create_user(self, credentials: str) -> None:
        user = User(**credentials)
        user.set_password(user.password)
        user.save()

    def authenticate(self, credentials: dict):
        login_response: HttpResponse = self.request(
            endpoint="auth/login",
            method="post",
            data=credentials
        )
        self.assertEqual(login_response.status_code, 200)

        JWT_TOKEN: str = login_response.json()["access"]
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + JWT_TOKEN)
