from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Diet


@api_view(['POST'])
def dietView(request):
    if request.method == 'POST':
        carbohydrates = request.data.get('carbohydrates')
        protein = request.data.get('protein')
        fats = request.data.get('fats')
        diet = Diet(carbohydrates=carbohydrates, protein=protein, fats=fats)
        diet.save()

        return Response({'status': 'success'}, status=status.HTTP_201_CREATED)