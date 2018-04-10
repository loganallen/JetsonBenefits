from django.shortcuts import render
from django.http import HttpResponse
from django.template.response import TemplateResponse

def main(request):
    return TemplateResponse(request, 'templates/index.html', {})