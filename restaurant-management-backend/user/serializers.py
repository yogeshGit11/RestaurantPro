# from django.contrib.auth.models import User
from .models import CustomUser
from rest_framework import serializers
from django.contrib.auth.hashers import make_password


# serializer for new user registration
class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "profile_pic",
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
            "password2",
        ]

    def validate(self, values):
        if values["password"] != values["password2"]:
            raise serializers.ValidationError(
                {"password": "Both Passwords not matching"}
            )
        values["password"] = make_password(values["password"])
        return values

    def create(self, validated_data):
        del validated_data["password2"]
        return super().create(validated_data)


# serializer for user login
class UserLoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=255)

    class Meta:
        model = CustomUser
        fields = ["username", "password"]


# serializer for user profile
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["profile_pic", "email", "first_name", "last_name"]

    def get_profile_pic(self, obj):
        request = self.context.get("request")
        if obj.profile_pic:
            return request.build_absolute_uri(obj.profile_pic.url)
        return None


# serializer for change password
class UserPassChangeSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(style={"input_type": "password"}, write_only=True)
    password1 = serializers.CharField(style={"input_type": "password"}, write_only=True)
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ["old_password", "password1", "password2"]

    def validate_old_password(self, value):
        user = self.context["user"]
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is incorrect.")
        return value

    def validate(self, values):
        password1 = values.get("password1")
        password2 = values.get("password2")
        user = self.context.get("user")
        if password1 != password2:
            raise serializers.ValidationError("Both password is not Matching...!")
        user.set_password(password1)
        user.save()
        return values


# serializer for Reset password
class ResetPasswordSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(style={"input_type": "password"}, write_only=True)
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ["password1", "password2"]

    def validate(self, values):
        password1 = values.get("password1")
        password2 = values.get("password2")
        user = self.context.get("user")
        if password1 != password2:
            raise serializers.ValidationError("Both password is not Matching...!")
        user.set_password(password1)
        user.save()
        return values
