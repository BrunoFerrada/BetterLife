from rest_framework import serializers

class CalculationSerializer(serializers.Serializer):
    
    formula = serializers.ChoiceField(choices=[('harris', 'Harris-Benedict'), ('mifflin', 'Mifflin-St Jeor')])