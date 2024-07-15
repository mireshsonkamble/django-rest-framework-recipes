from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import recipes_collection
from .serializers import RecipeSerializer
from bson import ObjectId  # Import ObjectId from bson


# Example of a more specific recipe detail view@api_view(["GET"])
@api_view(["GET"])
def get_recipe_detail(request, recipe_id):
    try:
        recipe_id = ObjectId(recipe_id)
        recipe = recipes_collection.find_one({"_id": recipe_id})
        if not recipe:
            raise Http404("No recipe matches the given query.")
    except Exception as e:
        raise Http404(f"Error: {str(e)}")
    serializer = RecipeSerializer(recipe)
    return Response(serializer.data)


@api_view(["GET"])
def get_recipes(request):
    recipes = recipes_collection.find()
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
        # Convert the recipe_id to ObjectId
        recipe_id = ObjectId(recipe_id)
        # Retrieve the recipe document
        recipe = recipes_collection.find_one({"_id": recipe_id})
        if not recipe:
            raise Http404("No recipe matches the given query.")
    except Exception as e:
        raise Http404(f"Error: {str(e)}")

    serializer = RecipeSerializer(recipe, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(["DELETE"])
def delete_recipe(request, recipe_id):
    try:
        # Convert the recipe_id to ObjectId
        recipe_id = ObjectId(recipe_id)
        # Delete the recipe document
        result = recipes_collection.delete_one({"_id": recipe_id})
        if result.deleted_count == 0:
            raise Http404("No recipe matches the given query.")
    except Exception as e:
        raise Http404(f"Error: {str(e)}")

    return Response({"message": "Recipe successfully deleted"}, status=204)
