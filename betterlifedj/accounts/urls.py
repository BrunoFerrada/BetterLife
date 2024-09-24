from django.urls import path
from .views import loginView
from .views import RegisterView

urlpatterns = [
    path('login/', loginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
]