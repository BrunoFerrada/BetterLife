from django.urls import path
from .views import CalculationView

urlpatterns = [
    path('calculation/', CalculationView.as_view(), name='calculation')
]
