from .models import CustomUser
from .serializers import (
    UserRegisterSerializer,
    UserLoginSerializer,
    UserProfileSerializer,
    UserPassChangeSerializer,
    ResetPasswordSerializer,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import exception_handler
from rest_framework.parsers import MultiPartParser, FormParser


# New User registration
class RegisterUserApi(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User Registration successfully"}, status=201)
        return Response(serializer.errors, status=400)


# this method is for get access token for logged in user
def get_token(user):
    refresh = RefreshToken.for_user(user)
    return {"access": str(refresh.access_token), "refresh": str(refresh)}


# User login after Registration
class UserLogin(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get("username")
            password = serializer.validated_data.get("password")
            user = authenticate(username=username, password=password)
            if user is not None:
                token = get_token(user)
                return Response(
                    {
                        "Message": "Login Success...",
                        "Token": token,
                    },
                    status=200,
                )
            else:
                return Response({"Message": "Wrong email or password..."}, status=404)
        return Response(serializer.errors, status=400)


# Profile page when user successfully logged in via jwt
class ProfileApi(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserProfileSerializer(user, context={"request": request})

        return Response(
            {
                "Message": f"WELCOME TO THE PROFILE {user.username}",
                "info": serializer.data,
            },
            status=200,
        )


# when user wants to change his password
class UserPassChangeApi(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UserPassChangeSerializer(
            data=request.data, context={"user": request.user}
        )
        if serializer.is_valid():
            return Response({"Message": "Password Changed Successfully..."}, status=201)
        return Response({"Message": serializer.errors}, status=400)


# when user forgot his password
class ResetPasswordApi(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"Message": "Email is Required..."}, status=404)

        user = CustomUser.objects.filter(email=email).first()
        if not user:
            return Response({"Message": "Your Email Not Found..."}, status=404)

        serializer = ResetPasswordSerializer(data=request.data, context={"user": user})
        if serializer.is_valid():
            return Response({"Message": "Password Reset Successfully..."}, status=201)
        return Response({"Message": serializer.errors}, status=400)


# custom exceptions
def custom_exception_handler(exc, context):

    response = exception_handler(exc, context)
    if response is not None:
        if response.data.get("code") == "token_not_valid":
            response.data = {
                "Message": "Your Token is either invalid or has expired.",
            }
            response.status_code = 401

    return response
