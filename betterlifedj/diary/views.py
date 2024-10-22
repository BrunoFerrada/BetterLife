from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Diary
from .models import Meal
from .serializers import DiaryMealSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import MealFood
from .serializers import MealFoodSerializer
from .models import DiaryMeal
from .serializers import DiarySerializer
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
import logging
from .models import Food
from .serializers import FoodSerializer

logger = logging.getLogger(__name__)


class FoodListView(generics.ListAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    permission_classes = [IsAuthenticated]

class DiarySaveView(generics.CreateAPIView):
    serializer_class = DiarySerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        data = request.data

        diary, created = Diary.objects.get_or_create(user=user, date=data['date'])
        diary.water_intake = data.get('water_intake', 0)
        diary.save()

        meals_data = data.get('meals', {})
        
        # Limpiamos las relaciones anteriores
        DiaryMeal.objects.filter(diary=diary).delete()

        # Asociamos las nuevas comidas con el diario
        for meal_name, foods in meals_data.items():
            meal = get_object_or_404(Meal, nameMeal=meal_name)  # Busca la comida (desayuno, almuerzo, cena)
            
            # Creamos la relación DiaryMeal para cada comida
            diary_meal = DiaryMeal.objects.create(diary=diary, meal=meal)
            diary_meal.save()

            # Asociamos los alimentos a cada comida a través de MealFood
            for food_data in foods:
                meal_food = MealFood.objects.create(meal=meal, food_id=food_data['idMealFood'])
                meal_food.save()

        return Response(DiarySerializer(diary).data)