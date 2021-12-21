from django.db.models import (
    Model,
    CASCADE,
    AutoField,
    CharField,
    TextField,
    ForeignKey,
    FloatField,
    BooleanField,
    DateTimeField,
)
from django.core.validators import MinLengthValidator

from accounts.models import User


class Stadium(Model):
    id = AutoField(primary_key=True)

    name = CharField(
        blank=False,
        unique=True,
        max_length=100,
        validators=[MinLengthValidator(3)]
    )

    provience = CharField(null=False, max_length=100)
    city = CharField(null=False, max_length=60)

    latitude = FloatField(max_length=30)
    longitude = FloatField(max_length=30)

    description = TextField()

    owner = ForeignKey(
        User,
        null=True,
        on_delete=CASCADE,
        related_name='owner'
    )

    telephone = CharField(max_length=15, blank=False)

    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

    is_verified = BooleanField(default=False)

    class Meta:
        ordering = ('id',)

    def __str__(self):
        return self.name
