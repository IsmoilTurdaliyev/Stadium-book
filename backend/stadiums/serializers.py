from rest_framework import serializers

from .models import Stadium
from orders.models import Order
from accounts.serializers import UserSerializer
from orders.serializers import OrderListSerializer


class StadiumListSerializer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField()
    orders = serializers.SerializerMethodField()

    def get_owner(self, obj: Stadium) -> list:
        return UserSerializer(obj.owner).data

    def get_orders(self, obj: Stadium) -> list:
        return [
            OrderListSerializer(order).data
            for order in Order.objects.filter(
                is_verified=True, stadium=obj
            )
        ]

    class Meta:
        model = Stadium
        fields = "__all__"


class StadiumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stadium
        fields = (
            "id", "name", "provience",
            "city", "latitude", "longitude",
            "description", "telephone", "owner"
        )
