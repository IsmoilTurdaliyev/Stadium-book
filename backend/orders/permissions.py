from json import loads

from django.http import HttpRequest

from rest_framework.permissions import BasePermission
from rest_framework.validators import ValidationError

from .models import Order


class OwnerOnly(BasePermission):
    def has_permission(self, request: HttpRequest, view):
        if request.user and request.user.is_authenticated:
            owner_id = loads(request.body).get("booked_by", None)

            if owner_id is not None:
                return bool(request.user.id == int(owner_id))

            raise ValidationError(detail={"error":"booked_by is required!"})
        return False

    def has_object_permission(self, request: HttpRequest, view, obj: Order):
        return bool(request.user == obj.booked_by)
