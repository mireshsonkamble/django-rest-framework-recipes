from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Recipe
from .serializers import RecipeSerializer
from django.http import Http404


@api_view(["GET"])
def get_recipe_detail(request, recipe_id):
    try:
        recipe = get_object_or_404(Recipe, id=recipe_id)
    except Recipe.DoesNotExist:
        raise Http404("No recipe matches the given query.")
    serializer = RecipeSerializer(recipe)
    return Response(serializer.data)


@api_view(["GET"])
def get_recipes(request):
    recipes = Recipe.objects.all()
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def add_recipe(request):
    serializer = RecipeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(["PUT"])
def update_recipe(request, recipe_id):
    try:
        recipe = get_object_or_404(Recipe, id=recipe_id)
    except Recipe.DoesNotExist:
        raise Http404("No recipe matches the given query.")
    serializer = RecipeSerializer(recipe, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(["DELETE"])
def delete_recipe(request, recipe_id):
    try:
        recipe = get_object_or_404(Recipe, id=recipe_id)
    except Recipe.DoesNotExist:
        raise Http404("No recipe matches the given query.")
    recipe.delete()
    return Response({"message": "Recipe successfully deleted"}, status=204)
