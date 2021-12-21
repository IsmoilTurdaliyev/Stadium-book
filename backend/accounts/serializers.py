from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id", "last_login", "username", 
            "first_name", "last_name",
            "date_joined", "email",
            "telephone", "password"
        )

        extra_kwargs = {'password': {'write_only': True}}

    def create(self, data: dict):
        user = User.objects.create(**data)
        user.set_password(data['password'])
        user.save()
        
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username", "first_name", "last_name",
            "date_joined", "email", "telephone",
        )
