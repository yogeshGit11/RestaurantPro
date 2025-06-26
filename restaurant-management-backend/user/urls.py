from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView,TokenVerifyView
urlpatterns = [
    path("register/", views.RegisterUserApi.as_view(), name="user_register"),
    path("login/", views.UserLogin.as_view(), name="user_login"),
    path("profile/", views.ProfileApi.as_view(), name="profile_api"),
    path("passchange/",views.UserPassChangeApi.as_view(),name="user_pass_change"),
    path('reset-password/',views.ResetPasswordApi.as_view(),name='reset_password'),
    path('get-new-token/',TokenRefreshView.as_view(),name='get_new_token'),
    path('varify-token/',TokenVerifyView.as_view(),name='varify_token'),
]