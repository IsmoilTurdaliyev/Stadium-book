from django.db import models
from django.contrib.auth.models import AbstractUser

from django.core.validators import MinLengthValidator


class User(AbstractUser):
    email = models.EmailField(unique=True, max_length=64)

    password = models.CharField(
        "password",
        max_length=128,
        validators=[MinLengthValidator(8)]
    )

    is_stadium_owner = models.BooleanField(default=False)
    telephone = models.CharField(max_length=15, null=True, unique=True)

    def __str__(self):
        return self.username
