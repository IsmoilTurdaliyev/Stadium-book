from datetime import datetime

from django.conf import settings

from rest_framework import serializers
from rest_framework.validators import ValidationError

from .models import Order
from .util import is_occupied
from accounts.serializers import UserSerializer


minimum_time = settings.MIN_TIME_FOR_BOOKING

BOOKING_EXCEPTION_MESSAGES = [
    "Please, enter the correct times for booking!",
    "The minimum time for booking is {} minutes!".format(
        int(minimum_time / 60)
    )
]


class OrderListSerializer(serializers.ModelSerializer):
    stadium = serializers.SerializerMethodField()
    booked_by = serializers.SerializerMethodField()

    def get_booked_by(self, obj: Order):
        return UserSerializer(obj.booked_by).data

    def get_stadium(self, obj: Order):
        return {
            "id": obj.stadium.id,
            "name": obj.stadium.name,
            "owner": UserSerializer(obj.stadium.owner).data
        }

    class Meta:
        model = Order
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            "id", "starts_at", "ends_at",
            "created_at", "updated_at",
            "stadium", "booked_by"
        )

    def create(self, data: dict):
        starts_at, ends_at = data['starts_at'], data['ends_at']

        self.validate_time(starts_at, ends_at)

        if is_occupied(data["stadium"], starts_at, ends_at):
            raise ValidationError(
                detail={"error": "You cannot book in this time!"},
                code=400
            )

        return super().create(data)

    def validate_time(self, starts_at: datetime, ends_at: datetime):
        if starts_at > ends_at:
            raise ValidationError(
                detail={"error": BOOKING_EXCEPTION_MESSAGES[0]})

        if (ends_at - starts_at).seconds < minimum_time:
            raise ValidationError(
                detail={"error": BOOKING_EXCEPTION_MESSAGES[1]})
