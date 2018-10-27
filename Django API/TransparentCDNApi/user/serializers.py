from rest_framework import serializers
from user.models import User, Role


class RoleSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True, max_value=None, min_value=None)
    permision = serializers.ChoiceField(Role.PERMISSIONS)

    def create(self, validated_data):
        """
        Create and return a new `Role` instance, given the validated data.
        """
        return Role.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Role` instance, given the validated data.
        """
        instance.permision = validated_data.get('permision', instance.permision)
        instance.save()
        return instance

class UserSerializer(serializers.Serializer):
    # id = serializers.IntegerField(read_only=True)
    n_socio = serializers.IntegerField(read_only=True, max_value=None, min_value=None)
    email = serializers.CharField(required=True, max_length=50, trim_whitespace = True, allow_null=False)
    password = serializers.CharField(required=True, max_length=20, min_length=8, allow_blank=False, trim_whitespace=True)
    user_permision = RoleSerializer(required=False)

    def create(self, validated_data):
        """
        Create and return a new `User` instance, given the validated data.
        """
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `User` instance, given the validated data.
        """
        instance.n_socio = validated_data.get('n_socio', instance.n_socio)
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        instance.permission = validated_data.get('permission', instance.permission)
        instance.save()
        return instance