from django.contrib.auth import authenticate
from rest_framework import serializers
from users.models import User
from .models import Diary
from .models import Meal
from .models import Food
from .models import MealFood
from .models import DiaryMeal

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['idFood', 'foodName', 'protein', 'carbohydrates', 'fats', 'calories']

class MealFoodSerializer(serializers.ModelSerializer):
    food = FoodSerializer(read_only=True)

    class Meta:
        model = MealFood
        fields = ['meal', 'food']

class MealSerializer(serializers.ModelSerializer):
    foods = serializers.SerializerMethodField()

    class Meta:
        model = Meal
        fields = ['idMeal', 'nameMeal', 'foods']

    def get_foods(self, obj):
        meal_foods = MealFood.objects.filter(meal=obj)
        return MealFoodSerializer(meal_foods, many=True).data

class DiaryMealSerializer(serializers.ModelSerializer):
    meal = MealSerializer(read_only=True)

    class Meta:
        model = DiaryMeal
        fields = ['diary', 'meal']

class DiarySerializer(serializers.ModelSerializer):
    meals = MealSerializer(many=True, read_only=True)

    class Meta:
        model = Diary
        fields = ['idDiary', 'user', 'date', 'water_intake', 'meals']