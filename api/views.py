from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_POST

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

def validateRequest(request, keys, type):
    """
        Validates that a request has the correct keys
        :param keys
            [ string ] --> list of keys
        :param request
            Request object
        :param type
            string --> 'GET' or 'POST'
        
        :return bool
    """
    result = True

    for key in keys:
        result = result and (key in request[type])
    
    return result


@require_POST
def signUp(request):
    """
        Sign Up for JetsonBenefits
        :param request 
            { POST: { firstName: string, lastName: string, email: string, password: string } }

        :return JsonResponse
            { success: bool, apiToken: string }

    """
    requiredKeys = ['firstName', 'lastName', 'email', 'password']

    if (validateRequest(request, requiredKeys, 'POST')):
        firstName = request.POST.firstName
        lastName = request.POST.lastName
        email = request.POST.email
        password = request.POST.password

        user = User.objects.create_user(username=email, email=email, password=password)
        user.save()
        return JsonResponse({ 'msg': 'signed up' })
    else:
        return JsonResponse({ 'error': 'POST required' })


@require_POST
def signIn(request):
    """
        Sign In to JetsonBenefits
        :param request
            { POST: { email: string, password: string } }

        :return JsonResponse
            { success: bool, apiToken: string }
    """
    requiredKeys = ['email', 'password']

    if (validateRequest(request, requiredKeys, 'POST')):
        email = request.POST.email
        password = request.POST.password

        success = True
        user = authenticate(email=email, password=password)
        if user is None: 
                success = False

        return JsonResponse({ 'success': success })
    else:
        return JsonResponse({ 'error': 'POST required' })


@require_POST
def updateUserInfo(request):
    """
        Update a users information
        :param request
            { POST: { user data , apiToken: string} }

        :return JsonResponse
            { success: bool }
    """
    requiredKeys = ['apiToken', 'userData']

    if (validateRequest(request, requiredKeys, 'POST')):
        token = request.POST.apiToken
        # -- fetch from USER table here
        # -- update corresponding fields
        return JsonResponse({ 'msg': 'success' })
    else:
        return JsonResponse({ 'error': 'POST required' })


@require_POST
def getUserInfo(request):
    """
        Get a users information
        :param request
            { POST: { apiToken: string } }
        
        :return JsonResponse
            { user data }
    """
    requiredKeys = ['apiToken']

    if (validateRequest(request, requiredKeys, 'POST')):
        token = request.POST.apiToken
        # -- fetch from USER table here
        # -- retrieve fields
        return JsonResponse({ 'msg': 'success' })
    else:
        return JsonResponse({ 'error': 'POST required' })