from django.db import models
from user.models import CustomUser


class MenuItem(models.Model):
    name = models.CharField(max_length=255)
    likes = models.ManyToManyField(
        CustomUser, related_name="menuitem_likes", blank=True
    )

    def __str__(self):
        return self.name


class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    likes = models.ManyToManyField(
        CustomUser, related_name="restaurant_likes", blank=True
    )
    menu_items = models.ManyToManyField(
        MenuItem, related_name="restaurants", blank=True
    )

    def __str__(self):
        return self.name


class SaveMenuItem(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="saved_menu_items"
    )
    menu_item = models.ForeignKey(
        MenuItem, on_delete=models.CASCADE, related_name="saved_by"
    )
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name="saved_by_user",
        null=True,
        blank=True,
    )
