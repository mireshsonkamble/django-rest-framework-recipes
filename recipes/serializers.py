from rest_framework import serializers
from django.utils import timezone
from bson import ObjectId  # Import ObjectId from bson
from .models import recipes_collection


class RecipeSerializer(serializers.Serializer):
    id = serializers.CharField(source="_id", read_only=True)
    name = serializers.CharField(max_length=100)
    ingredients = serializers.CharField()
    steps = serializers.CharField()
    preparationTime = serializers.IntegerField()
    created_at = serializers.DateTimeField(read_only=True)
    last_modified = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        validated_data["preparationTime"] = int(validated_data.get("time", 0))
        validated_data["created_at"] = timezone.now()
        validated_data["last_modified"] = timezone.now()
        result = recipes_collection.insert_one(validated_data)
        validated_data["_id"] = result.inserted_id
        return validated_data

    def update(self, instance, validated_data):
        validated_data["preparationTime"] = int(
            validated_data.get("preparationTime", 0)
        )
        validated_data["last_modified"] = timezone.now()

        try:
            # Convert string _id to ObjectId for MongoDB query
            recipe_id = ObjectId(instance["_id"])
            recipes_collection.replace_one({"_id": recipe_id}, validated_data)
        except Exception as e:
            raise serializers.ValidationError(str(e))
        return validated_data
