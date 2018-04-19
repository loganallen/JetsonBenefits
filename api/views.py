from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_POST, require_GET

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

def validateRequest(request, keys, method):
    """
        Validates that a request has the correct keys
        :param keys
            [ string ] --> list of keys
        :param request
            Request object
        :param method
            string --> 'GET' or 'POST'
        
        :return bool
    """
    result = True

    for key in keys:
        result = result and (key in request[method])
    
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
    res = { 'success': False, 'error': '', 'token': '' }

    if (validateRequest(request, requiredKeys, 'POST')):
        firstName = request.POST['firstName']
        lastName = request.POST['lastName']
        email = request.POST['email']
        password = request.POST['password']

        # check if user has already been created
        if User.objects.filter(username=email).exists():
            res['success'] = False
            res['error'] = 'Existing account already associated with ' + email
        else:
            # create user & api token
            user = User.objects.create_user(username=email, email=email, password=password)
            user.save()
            token = Token.objects.create(user=user)
            token.save()
            res['success'] = True
            res['token'] = token.key

    else:
        res['success'] = False
        res['error'] = 'Invalid POST args'

    return JsonResponse(res)

@require_POST
def signIn(request):
    """
        Sign In for JetsonBenefits
        :param request 
            { POST: { username: string, password: string } }

        :return JsonResponse
            { success: bool, apiToken: string }

    """
    requiredKeys = ['username', 'password']
    res = { 'success': False, 'error': '', 'token': '' }

    if (validateRequest(request, requiredKeys, 'POST')):
        print(request.POST)
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)

        # check if user has already been created
        if user is None:
            res['success'] = False
            res['error'] = 'Incorrect username and password combination'
        else:
            # create user & api token
            token = Token.objects.get(user=user)
            if token is not None:
                res['success'] = True
                res['token'] = token.key
            else:
                res['success'] = False
                res['error'] = 'No token exists for user'

    else:
        res['success'] = False
        res['error'] = 'Invalid POST args'

    return JsonResponse(res)


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


@require_GET
def getUserInfo(request):
    """
        Get a users information
        :param request
            { POST: { apiToken: string } }
        
        :return JsonResponse
            { user data }
    """
    requiredKeys = ['apiToken']

    if (validateRequest(request, requiredKeys, 'GET')):
        token = request.GET.apiToken
        # -- fetch from USER table here
        # -- retrieve fields
        return JsonResponse({ 'msg': 'success' })
    else:
        return JsonResponse({ 'error': 'POST required' })