from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter
from rest_framework.viewsets import ModelViewSet

from .models import Order
from .serializers import OrderSerializer
from .serializers import OrderListSerializer

from .permissions import OwnerOnly


class OrderViewset(ModelViewSet):
    queryset = Order.objects.filter(is_verified=True).all()

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return OrderListSerializer
        return OrderSerializer

    def get_permissions(self) -> tuple:
        permissions: dict = {
            "GET": AllowAny,
            "POST": OwnerOnly,
            "PUT": OwnerOnly,
            "PATCH": OwnerOnly,
            "DELETE": OwnerOnly,
        }

        return (
            permissions.get(
                self.request.method,
                (AllowAny(),)
            )(),
        )


order_router = DefaultRouter()
order_router.register(r'orders', OrderViewset)
urls = order_router.urls
