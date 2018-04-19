from django.urls import path, re_path
from api import views

urlpatterns = [
    path('signup', views.signUp, name='signup'),
    path('signin', views.signIn, name="signIn"),
    path('update-user-info', views.updateUserInfo, name="updateUserInfo"),
    path('get-user-info', views.getUserInfo, name="getUserInfo")
]