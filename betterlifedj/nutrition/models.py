from django.db import models


class Diet(models.Model): 
    idDiet = models.AutoField(primary_key=True)
    dietname = models.CharField(max_length=150)
    calories = models.FloatField(default=0)
    protein = models.FloatField(default=0)
    carbohydrates = models.FloatField(default=0)
    fats = models.FloatField(default=0)
    user = models.ForeignKey('users.User', null=True, on_delete=models.CASCADE, related_name='diet')