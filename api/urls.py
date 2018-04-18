from django.urls import path, re_path
from api import views

urlpatterns = [
    path('signup', views.signUp, name='signup'),
]