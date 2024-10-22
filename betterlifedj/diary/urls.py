
from django.urls import path
from .views import FoodListView, DiarySaveView

urlpatterns = [
    path('api/foods/', FoodListView.as_view(), name='food-list'),
    path('api/diary/save', DiarySaveView.as_view(), name='diary-save'),
    
]