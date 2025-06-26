from django.contrib import admin
from .models import Restaurant, MenuItem, SaveMenuItem


@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "likes_by", "all_menu_items")

    def likes_by(self, obj):
        return ", ".join([str(user.id) for user in obj.likes.all()])

    def all_menu_items(self, obj):
        return ", ".join([str(menu.id) for menu in obj.menu_items.all()])


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "likes_by")

    def likes_by(self, obj):
        return ", ".join([str(user.id) for user in obj.likes.all()])


@admin.register(SaveMenuItem)
class SaveMenuItemAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "menu_item", "restaurant")
