from django.urls import path
from .views import dietView
from . import views

urlpatterns = [
    path('diet/', views.dietView, name='diet'),
]