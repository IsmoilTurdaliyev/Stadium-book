from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter

from rest_framework import viewsets

from .models import Stadium
from .serializers import StadiumSerializer
from .serializers import StadiumListSerializer

from .permission import IsOwner
from .permission import IsOwnerOfStadium


class StadiumViewSet(viewsets.ModelViewSet):
    queryset = Stadium.objects.filter(is_verified=True).all()

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return StadiumListSerializer
        return StadiumSerializer

    def get_permissions(self) -> tuple:
        permissions: dict = {
            "GET": (AllowAny(),),
            "POST": (IsOwner(),),
            "PUT": (IsOwnerOfStadium(),),
            "PATCH": (IsOwnerOfStadium(),),
            "DELETE": (IsOwnerOfStadium(),),
        }
        return permissions.get(self.request.method, (AllowAny(),))


stadium_router = DefaultRouter()
stadium_router.register(r'stadiums', StadiumViewSet)
urls = stadium_router.urls
