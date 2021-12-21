from datetime import date, datetime

from django.db.models import (
    Model,
    AutoField,
    DateTimeField,
    BooleanField,
    ForeignKey,
    CASCADE
)

from accounts.models import User
from stadiums.models import Stadium


class Order(Model):
    id = AutoField(primary_key=True)

    stadium = ForeignKey(
        Stadium,
        blank=False,
        on_delete=CASCADE,
        related_name="stadium",

    )

    booked_by = ForeignKey(
        User,
        null=False,
        blank=False,
        on_delete=CASCADE,
        related_name='booked_by'
    )

    starts_at = DateTimeField()
    ends_at = DateTimeField()

    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

    is_verified = BooleanField(default=False)

    class Meta:
        ordering = ('id',)

    def __str__(self):
        return "Order({} | {})".format(
            self.stadium, self.booked_by,
        )
