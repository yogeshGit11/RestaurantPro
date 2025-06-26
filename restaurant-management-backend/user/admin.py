from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    list_display = (
        "profile_pic",
        "username",
        "email",
        "first_name",
        "last_name",
        "is_staff",
    )
    fieldsets = UserAdmin.fieldsets + ((None, {"fields": ("profile_pic",)}),)
    add_fieldsets = [
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "profile_pic",
                    "username",
                    "email",
                    "first_name",
                    "last_name",
                    "password1",
                    "password2",
                ),
            },
        ),
    ]


admin.site.register(CustomUser, CustomUserAdmin)
