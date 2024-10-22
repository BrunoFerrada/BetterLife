from rest_framework import serializers
from .models import Diet

class DietSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diet
        fields = ['idDiet', 'dietname', 'calories', 'protein', 'carbohydrates', 'fats', 'user']