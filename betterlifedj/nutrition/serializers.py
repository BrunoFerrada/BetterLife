from rest_framework import serializers

class CalculationSerializer(serializers.Serializer):
    
    formula = serializers.ChoiceField(choices=[('harris', 'Harris-Benedict'), ('mifflin', 'Mifflin-St Jeor')])from rest_framework import serializers
from .models import Diet

class DietSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diet
        fields = ['idDiet', 'dietname', 'calories', 'protein', 'carbohydrates', 'fats', 'user']