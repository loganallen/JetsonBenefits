from django.shortcuts import render
from django.http import HttpResponse
from django.template.response import TemplateResponse

"""
    main() -> renders our base template with some useful data
        baseURL - the host of our application, could be 'localhost' or custom domain
        device - device that this webpage is being requested from
        isMobile - true if device is a mobile one
"""
def main(request):
    return TemplateResponse(request, 'templates/index.html', { 
        'env': {
            'baseURL': request.META['HTTP_HOST'],
            'device': request.user_agent.device.family,
            'isMobile': request.user_agent.is_mobile
        }
    })