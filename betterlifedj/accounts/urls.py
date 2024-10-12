from django.urls import path
from .views import loginView
from .views import RegisterView
from .views import EditProfileView
from .views import ProfileView

urlpatterns = [
    path('login/', loginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('edit-profile/', EditProfileView.as_view(), name='editprofile'),
    
]