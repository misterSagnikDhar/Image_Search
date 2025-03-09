from django.urls import path
from . import views

urlpatterns = [
    path("search_images/", views.search_images, name="search_images"),
    path("get_image/<str:image_id>/", views.get_image, name="get_image"),
]
