from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_POST

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
            { POST: { name: string, email: string, password: string } }

        :return JsonResponse
            { success: bool, apiToken: string }

    """
    requiredKeys = ['name', 'email', 'password']

    if (validateRequest(request, requiredKeys, 'POST')):
        name = request.POST.name
        email = request.POST.email
        password = request.POST.password
        # -- add to USER table here
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
        # -- fetch from USER table here
        return JsonResponse({ 'msg': 'logged in' })
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