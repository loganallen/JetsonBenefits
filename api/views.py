from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_POST

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes

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

    d = request.POST if method == 'POST' else request.GET

    for key in keys:
        result = result and (key in d)
    
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
            token = Token.objects.create(user=user)
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
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)

        # check if user has already been created
        if user is None:
            res['success'] = False
            res['error'] = 'Incorrect username and password combination'
        else:
            print('authenticated user: ' + username)
            # retrieve api token
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


@api_view(['POST'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
def updateUserInfo(request):
    """
        Update a users information
        :param request
            { POST: { userData: object } }

        :return JsonResponse
            { success: bool }
    """
    requiredKeys = ['userData']

    if (validateRequest(request, requiredKeys, 'POST')):
        user = request.user
        # -- fetch from USER table here
        # -- update corresponding fields
        return JsonResponse({ 'msg': 'success' })
    else:
        return JsonResponse({ 'error': 'POST required' })


@api_view(['GET'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
def getUserInfo(request):
    """
        Get a users information
        :param request:
        
        :return JsonResponse
            { user data }
    """
    requiredKeys = []

    if (validateRequest(request, requiredKeys, 'GET')):
        user = request.user
        # -- fetch from USER table here
        # -- retrieve fields
        return JsonResponse({ 'msg': 'success' })
    else:
        return JsonResponse({ 'error': 'POST required' })