from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated

from rest_framework.generics import CreateAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView

from .models import User

from .serializers import UserSerializer
from .serializers import UserProfileSerializer


class CreateUserView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = UserSerializer


class UserProfileView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        self.kwargs['pk'] = self.request.user.pk

        return super(UserProfileView, self).get_object()

    def get_serializer_class(self):
        serializers = {
            "GET": UserSerializer,
            "PUT": UserProfileSerializer,
            "PATCH": UserProfileSerializer,
            "DELETE": UserProfileSerializer,
        }
        return serializers.get(self.request.method, UserSerializer)


profile_view = UserProfileView.as_view()
create_user_view = CreateUserView.as_view()

__all__ = ["profile_view", "create_user_view", ]
