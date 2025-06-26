from django.urls import path
from . import views

urlpatterns = [
    path("add-restaurant/", views.AddRestaurantApi.as_view(), name="add_restaurant"),
    path("get-restaurant/", views.RestaurantApi.as_view(), name="get_restaurants"),
    path("get-restaurant/<int:pk>/", views.RestaurantApi.as_view(), name="get_restaurant"),
    path("add-menuitem/<int:pk>/", views.AddMenuItemApi.as_view(), name="add_menuitem"),
    path("restaurant/like/<int:pk>/",views.LikeRestaurantApi.as_view(),name='like-restaurant'),
    path("menuitem/like/<int:pk>/",views.LikeMenuItemApi.as_view(),name='like-menuitem'),
    path("menuitem/save/<int:menu_id>/<int:restaurant_id>/",views.SaveMenuItemApi.as_view(),name='save-menuitem'),
    path("get-saved-menuitems/",views.GetSavedMenuItemApi.as_view(),name='saved-menuitems'),
    path("remove-saved-menuitem/<int:pk>/",views.GetSavedMenuItemApi.as_view(),name='remove-menuitem')
]
