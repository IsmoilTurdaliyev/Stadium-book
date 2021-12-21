from django.http import HttpResponse
from rest_framework.test import APIClient

from accounts.models import User
from tests.util import CustomTestCase
from tests.util import CREDENTIALS_FOR_LOGIN as login_data
from tests.util import CREDENTIALS_FOR_REGISTER as register_data


class AccountsTest(CustomTestCase):
    def setUp(self) -> None:
        self.create_user(login_data)
        self.client = APIClient()

    def test_get_user(self):
        """
        Try to get user which is
        created on setUp
        """
        self.assertEqual(
            login_data["username"],
            User.objects.filter(
                username=login_data["username"]
            ).first().username
        )

    def test_login_for_bad_request(self):
        """
        Test with an empty response body
        """
        response: HttpResponse = self.request(
            endpoint="auth/login",
            method="post"
        )
        self.assertEqual(response.status_code, 400)

    def test_login_for_unauthorized(self):
        """
        Test with wrong credentials
        """
        response: HttpResponse = self.request(
            endpoint="auth/login",
            method="post",
            data={
                "username": "wrong_username",
                "password": "wrong_password"
            }
        )
        self.assertEqual(response.status_code, 401)
        self.assertEqual(
            response.json().get("detail"),
            "No active account found with the given credentials"
        )

    def test_login(self):
        """
        Test with correct credentials
        """
        response: HttpResponse = self.request(
            endpoint="auth/login",
            method="post",
            data=login_data
        )
        self.assertEqual(response.status_code, 200)

    def test_register_for_required_fields(self):
        """
        Test required fields on register endpoint
        """
        response: HttpResponse = self.request(
            endpoint="auth/register",
            method="post",
            data={}
        )

        for value in response.json().values():
            self.assertEqual(value[0], "This field is required.")

        self.assertEqual(response.status_code, 400)

    def test_register_fields_for_uniqueness(self):
        """
        Test fields for uniqueness.
        Try to register with the user's credentials
        which is already exist on the database
        """
        response: HttpResponse = self.request(
            endpoint="auth/register",
            method="post",
            data=login_data
        )
        self.assertEqual(response.status_code, 400)

        messages: list[str] = [
            value[0]
            for value in response.json().values()
        ]

        for message in messages:
            self.assertTrue("exists" in message)

    def test_register_user(self):
        """
        Test register functionality with
        correct credentials
        """

        response: HttpResponse = self.request(
            endpoint="auth/register",
            method="post",
            data=register_data
        )

        self.assertEqual(response.status_code, 201)

        user = User.objects.filter(
            username=register_data["username"]
        ).first()

        self.assertEqual(user.email, register_data["email"])
        self.assertEqual(user.username, register_data["username"])
        self.assertEqual(user.telephone, register_data["telephone"])

    def test_user_profile_unauthorized(self):
        """
        Test user profile endpoint without
        Authorization header
        """
        response: HttpResponse = self.request(
            endpoint="users/me",
            method="get",
        )
        self.assertEqual(response.status_code, 401)
        self.assertEqual(
            response.json()["detail"],
            "Authentication credentials were not provided."
        )

    def test_user_profile(self):
        """
        Test user profile endpoint
        """
        self.authenticate(login_data)

        response: HttpResponse = self.request(
            endpoint="users/me"
        )

        response_body = response.json()

        self.assertEqual(response_body["id"], 1)
        self.assertEqual(response_body["username"], login_data["username"])
        self.assertEqual(response_body["email"], login_data["email"])

    def test_user_profile_update(self):
        """
        Test user profile's updating functionality
        by updating the telephone number and username
        """
        NEW_USERNAME: str = "Akhmadboy"
        PHONE_NUMBER: str = "+998772223366"

        self.authenticate(login_data)

        response: HttpResponse = self.request(
            endpoint="users/me",
            method="patch",
            data={
                "username": NEW_USERNAME,
                "telephone": PHONE_NUMBER
            }
        )

        self.assertEqual(response.status_code, 200)

        response_body = response.json()

        self.assertEqual(response_body["username"], NEW_USERNAME)
        self.assertEqual(response_body["telephone"], PHONE_NUMBER)
        self.assertEqual(response_body["email"], login_data["email"])

    def test_user_profile_delete(self):
        """
        Test user profile's deleting functionality
        """
        self.authenticate(login_data)

        response: HttpResponse = self.request(
            endpoint="users/me",
            method="delete"
        )

        self.assertEqual(response.status_code, 204)
        self.assertEqual(User.objects.count(), 0,msg="🎉")
