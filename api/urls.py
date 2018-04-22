from django.urls import path, re_path
from api import views

"""
    API URLS: maps url path to view function in api/views.py
    Note: this files is included in jetson/urls.py, so these paths are "host/api/path"
"""

urlpatterns = [
    path('signup', views.signup, name='signup'),
    path('login', views.login, name="signIn"),
    path('update-user-info', views.updateUserInfo, name="updateUserInfo"),
    path('get-user-info', views.getUserInfo, name="getUserInfo"),
    path('update-insurance-info', views.updateInsuranceInfo, name="updateInsuranceInfo"),
    path('get-insurance-info', views.getInsuranceInfo, name="getInsuranceInfo"),
    path('get-all-insurance-info', views.getAllInsuranceInfo, name="getAllInsuranceInfo"),
    path('get-insurance-quote', views.getInsuranceQuote, name="getInsuranceQuote"),
    path('get-all-insurance-quotes', views.getAllInsuranceQuotes, name="getAllInsuranceQuotes"),
    path('generate-insurance-quotes', views.generateInsuranceQuotes, name="generateInsuranceQuotes")
]