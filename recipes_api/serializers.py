# serializers.py
from rest_framework import serializers
from .models import Recipe

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'

    def create(self, validated_data):
        validated_data["preparationTime"] = int(validated_data.get("preparationTime", 0))
        return Recipe.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.ingredients = validated_data.get("ingredients", instance.ingredients)
        instance.steps = validated_data.get("steps", instance.steps)
        instance.preparationTime = int(validated_data.get("preparationTime", instance.preparationTime))
        instance.last_modified = int(validated_data.get("preparationTime", instance.preparationTime))
        instance.save()
        return instance
