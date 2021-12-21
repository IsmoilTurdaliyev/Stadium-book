from django.http import HttpRequest
from rest_framework.permissions import BasePermission

from .models import Stadium


class Permission(BasePermission):
    def has_permission(self, request: HttpRequest, view) -> bool:
        if not request.user.is_authenticated:
            return False

        return True if request.user.is_superuser \
            else bool(request.user.is_stadium_owner)


class IsOwnerOfStadium(Permission):
    def has_object_permission(
            self, request: HttpRequest, view, obj: Stadium) -> bool:
        if request.user.is_authenticated:
            return bool(
                obj.owner == request.user or
                request.user.is_superuser
            )
        return False


class IsOwner(Permission):
    def has_permission(self, request: HttpRequest, view):
        if request.user.is_authenticated:
            return bool(
                request.user.is_stadium_owner or
                request.user.is_superuser
            )
        return False
