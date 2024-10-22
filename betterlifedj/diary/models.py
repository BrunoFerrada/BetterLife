
from django.db import models
from users.models import User

class Meal(models.Model):
    idMeal = models.AutoField(primary_key=True)  # ID autogenerado para la comida
    nameMeal = models.CharField(max_length=255)  # Nombre de la comida (desayuno, almuerzo, cena)

    def __str__(self):
        return self.nameMeal
    

class Food(models.Model):
    idFood = models.AutoField(primary_key=True)  # ID autogenerado para el alimento
    foodName = models.CharField(max_length=255)
    protein = models.FloatField(null=True, blank=True)
    carbohydrates = models.FloatField(null=True, blank=True)
    fats = models.FloatField(null=True, blank=True)
    calories = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.foodName

class MealFood(models.Model):
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.meal.nameMeal} - {self.food.foodName}"
    

    
class Diary(models.Model):
    idDiary = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    water_intake = models.FloatField(default=0)  # Water intake in ml
    meals = models.ManyToManyField(Meal, through='DiaryMeal')

    def __str__(self):
        return f"Diary of {self.user.username} on {self.date}"
    
class DiaryMeal(models.Model):
    diary = models.ForeignKey(Diary, on_delete=models.CASCADE)
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.diary.user.username} - {self.meal.nameMeal} on {self.diary.date}"




