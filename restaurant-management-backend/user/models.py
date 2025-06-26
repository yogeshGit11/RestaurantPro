from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
import re


def validate_email(value):
    regex = r"^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$"
    check_mail = re.match(regex, value)
    if check_mail:
        return value
    else:
        raise ValidationError("Invalid email address!...")


def check_name(value):
    if len(value) <= 3:
        raise ValidationError("Name must be at least 4 characters long!")
    if not value.isalpha():
        raise ValidationError("Name must only contain letters!")
    return value


class CustomUser(AbstractUser):
    profile_pic = models.FileField(upload_to="profile_pics/", blank=True, null=True)
    email = models.EmailField(max_length=255, unique=True, validators=[validate_email])
    first_name = models.CharField(max_length=255, validators=[check_name])
    last_name = models.CharField(max_length=255, validators=[check_name])
