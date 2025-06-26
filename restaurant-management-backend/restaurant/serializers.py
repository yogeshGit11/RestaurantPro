from rest_framework import serializers
from .models import Restaurant, MenuItem, SaveMenuItem


class MenuitemSerializer(serializers.ModelSerializer):
    menu_likes = serializers.SerializerMethodField()

    class Meta:
        model = MenuItem
        fields = ("id", "name", "menu_likes")

    def get_menu_likes(self, value):
        return value.likes.count()


class RestaurantSerializer(serializers.ModelSerializer):
    menu_items = MenuitemSerializer(many=True, read_only=True)
    total_likes = serializers.SerializerMethodField()

    class Meta:
        model = Restaurant
        fields = ("id", "name", "total_likes", "menu_items")

    def get_total_likes(self, value):
        return value.likes.count()


class SaveMenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaveMenuItem
        fields = ("id", "user", "menu_item", "restaurant")
