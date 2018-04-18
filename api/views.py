from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

def signUp(request):
    """
        Sign Up for JetsonBenefits
        :param request:
        :return JsonResponse:
    """
    if (request.method == 'POST'):
        name = request.POST.name
        email = request.POST.eamil
        password = request.POST.password
        # -- add to USER table here
        return JsonResponse({ 'msg': 'signed up' })
    else:
        return JsonResponse({ 'error': 'POST required' })