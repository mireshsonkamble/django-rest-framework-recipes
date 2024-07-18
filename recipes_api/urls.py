from django.urls import path
from . import views

urlpatterns = [
    path("addRecipe/", views.add_recipe, name="add_recipe"),
    path("getRecipes/", views.get_recipes, name="get_recipes"),
    path("<int:recipe_id>/", views.get_recipe_detail, name="get_recipe_detail"),
    path("<int:recipe_id>/update/", views.update_recipe, name="update_recipe"),
    path("<int:recipe_id>/delete/", views.delete_recipe, name="delete_recipe"),
]
