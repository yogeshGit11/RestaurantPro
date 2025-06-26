from .serializers import (
    RestaurantSerializer,
    MenuitemSerializer,
    SaveMenuItemSerializer,
)
from django.shortcuts import get_object_or_404
from .models import Restaurant, MenuItem, SaveMenuItem
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


class RestaurantApi(APIView):
    def get(self, request, pk=None):
        if pk:
            restaurant = Restaurant.objects.get(id=pk)
            serializer = RestaurantSerializer(restaurant)
            return Response(serializer.data, status=200)
        restaurant = Restaurant.objects.all()
        serializer = RestaurantSerializer(restaurant, many=True)
        return Response(serializer.data, status=200)


class AddRestaurantApi(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        restaurant = Restaurant.objects.filter(name=request.data.get("name"))
        if restaurant:
            return Response({"Message": "Restaurant already exists"}, status=400)
        serializer = RestaurantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"Message": "Restaurant Added Successfully..."}, status=200)
        return Response(serializer.errors, status=400)


class AddMenuItemApi(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        restaurant = Restaurant.objects.get(id=pk)
        menu_item_name = request.data.get("name")

        if restaurant.menu_items.filter(name=menu_item_name).exists():
            return Response(
                {"Message": f"This Menu Item already exists in {restaurant.name}"},
                status=400,
            )
        menu_item, new_menuitem = MenuItem.objects.get_or_create(name=menu_item_name)
        if new_menuitem:
            serializer = MenuitemSerializer(menu_item, data=request.data)
            if serializer.is_valid():
                serializer.save()
                restaurant.menu_items.add(menu_item.id)
                return Response(
                    {
                        "Message": f"Menu Item NEWLY Added Successfully for {restaurant.name}"
                    },
                    status=201,
                )
            else:
                return Response(serializer.errors, status=400)

        restaurant.menu_items.add(menu_item)
        return Response(
            {"Message": f"Menu Item Added Successfully for {restaurant.name}"},
            status=201,
        )


class LikeRestaurantApi(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            restaurant = Restaurant.objects.get(id=pk)
            if restaurant.likes.filter(username=request.user).exists():
                return Response(
                    {"Message": "You had already liked this restaurant."}, status=200
                )
            restaurant.likes.add(request.user)
            return Response({"Message": "Restaurant Liked Successfully..."}, status=200)
        except Exception:
            return Response({"Message": "Restaurant Not Found..."}, status=404)


class LikeMenuItemApi(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            menuitem = MenuItem.objects.get(id=pk)
            if menuitem.likes.filter(username=request.user).exists():
                return Response(
                    {"Message": "You had already liked this menu item."}, status=200
                )
            menuitem.likes.add(request.user)
            return Response({"Message": "Menu Item Liked Successfully..."}, status=200)
        except Exception:
            return Response({"Message": "Menu Item Not Found..."}, status=404)


class SaveMenuItemApi(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, menu_id, restaurant_id):
        try:
            menuitem = MenuItem.objects.get(id=menu_id)
            restaurant = Restaurant.objects.get(id=restaurant_id)
            if SaveMenuItem.objects.filter(
                user__username=request.user.username, menu_item=menuitem
            ):
                return Response(
                    {"Message": "You had already saved this menu item."}, status=200
                )
            save_item = SaveMenuItem.objects.create(
                user=request.user, menu_item=menuitem, restaurant=restaurant
            )
            save_item.save()
            return Response(
                {"Message": f"Menu Item {menuitem.name} Saved Successfully..."},
                status=200,
            )
        except Exception:
            return Response({"Message": "Menu Item Not Found to save..."}, status=404)


class GetSavedMenuItemApi(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        saved_menuitems = SaveMenuItem.objects.filter(user=request.user)
        serializer = SaveMenuItemSerializer(saved_menuitems, many=True)
        save_list = []  # Create a list to hold the saved menu items

        for data in serializer.data:
            menu_item = MenuItem.objects.get(id=data["menu_item"])
            restaurant = None
            restaurant_name = None

            if data["restaurant"] is not None:
                restaurant = Restaurant.objects.get(id=data["restaurant"])
                restaurant_name = restaurant.name

            save_list.append(
                {
                    "id": data["id"],
                    "item name": menu_item.name,
                    "restaurant": restaurant_name,
                }
            )

        return Response(
            {"User Name": request.user.username, "Saved MenuItems": save_list},
            status=200,
        )
    
    def delete(self, request, pk):
        try:
            saved_menuitem = get_object_or_404(SaveMenuItem, id=pk)
            saved_menuitem.delete()
            return Response({"Message": "Removed"})
        except SaveMenuItem.DoesNotExist:
            return Response({"Message": "Saved menu item not found"})
