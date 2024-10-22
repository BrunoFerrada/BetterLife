from django.urls import path
from .views import CalculationView
from . import views

urlpatterns = [
    path('calculation/', CalculationView.as_view(), name='calculation'),
    path('diet/', views.dietView, name='diet'),
]
