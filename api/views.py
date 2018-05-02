from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_POST

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes

from app.models import *
import json
from app.scripts.recommendation_logic import *

def validateRequest(request, keys, method, response):
    """
        Validates that a request has the correct keys
        :param keys
            [ string ] --> list of keys
        :param request
            Request object
        :param method
            string --> 'GET' or 'POST'
        
        :return bool
            --> Note: updates response object passed in to set success and error messages
    """
    result = True

    d = request.POST.dict() if method == 'POST' else request.GET.dict()

    for key in keys:
        result = result and (key in d)
    
    # if incorrect args, update the response object and set status_code to an error code
    if not result:
        response['sucess'] = False
        response['error'] = 'Invalid ' + method + ' arguments'
        response['status_code'] = 500

    return result


@require_POST
def signup(request):
    """
        Sign Up for JetsonBenefits
        :param request 
            { POST: { firstName: string, lastName: string, email: string, password: string } }

        :return JsonResponse
            { success: bool, token: string, error: string }

    """
    requiredKeys = ['firstName', 'lastName', 'email', 'password']
    res = { 'success': False, 'error': '', 'token': '' }

    if (validateRequest(request, requiredKeys, 'POST', res)):
        firstName = request.POST['firstName']
        lastName = request.POST['lastName']
        email = request.POST['email']
        password = request.POST['password']

        # check if user has already been created
        if User.objects.filter(username=email).exists():
            res['success'] = False
            res['error'] = 'Existing account already associated with ' + email
            print(res['error'])
        else:
            # create user & api token
            user = User.objects.create_user(
                username=email,
                email=email,
                password=password,
                first_name=firstName,
                last_name=lastName
            )
            token = Token.objects.create(user=user)
            res['success'] = True
            res['token'] = token.key
            print('created user: ' + user.username)

    return JsonResponse(res)


@require_POST
def login(request):
    """
        Log In for JetsonBenefits
        :param request 
            { POST: { username: string, password: string } }

        :return JsonResponse
            { success: bool, token: string, error: string }

    """
    requiredKeys = ['username', 'password']
    res = { 'success': False, 'error': '', 'token': '' }

    if (validateRequest(request, requiredKeys, 'POST', res)):
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
                res['name'] = user.first_name
            else:
                res['success'] = False
                res['error'] = 'No token exists for user'

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
            { success: bool, error: string }
    """

    requiredKeys = ['userData']
    res = { 'success': False, 'error': '' }
    if (validateRequest(request, requiredKeys, 'POST', res)):
        user = request.user
        user_id = user.id
        userData = json.loads(request.POST['userData'])
        age = userData['age']
        zipcode = userData['zipcode']
        num_kids = userData['num_kids']
        marital_status = userData['marital_status']
        spouse_annual_income = userData['spouse_annual_income']
        annual_income = userData['annual_income']
        kid_ages = userData['kid_ages']
        
        getAnswers = user_general_answers(user_id = user, age = age, zipcode = zipcode, num_kids = num_kids, marital_status = marital_status, spouse_annual_income = spouse_annual_income, annual_income = annual_income)
        getAnswers.save()

        i = 0
        while(i<len(kid_ages)):
            age = user_kids(user_id = user, kid_age = kid_ages[i], will_pay_for_college = 'yes')
            age.save()
            i = i+1


        res['success'] = True

    return JsonResponse(res)


@api_view(['GET'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
def getUserInfo(request):
    """
        Get a users information
        :param request:
        
        :return JsonResponse
            { success: bool, error: string, data: object }
    """
    requiredKeys = []
    res = { 'success': False, 'error': '', data: None }

    if (validateRequest(request, requiredKeys, 'GET', res)):
        user = request.user
        data = list(user_general_answers.objects.filter(user_id=user.id).values())
        res['data'] = data
        res['success'] = True

    return JsonResponse(res)


@api_view(['POST'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
def updateInsuranceInfo(request):
    """
        Update insurance info for a user
        :param request:

        :return JsonResponse
            { success: bool, error: string }
    """
    requiredKeys = ['insuranceType', 'insuranceData']
    res = { 'success': False, 'error': '' }

    if (validateRequest(request, requiredKeys, 'POST', res)):
        user = request.user
        user_id = user.id
        insuranceData = json.loads(request.POST['insuranceData'])
        insuranceType = request.POST['insuranceType']

        if (insuranceType == "Health"):
            q_1 = userData['q_1']
            q_2 = userData['q_2']
            q_3 = userData['q_3']
            q_4 = userData['q_4']
            q_5 = userData['q_5']
            q_6 = userData['q_6']
            q_7 = userData['q_7']
            q_8 = userData['q_8']
            q_9 = userData['q_9']
            q_10 = userData['q_10']
            q_11 = userData['q_11']
            q_12 = userData['q_12']

            healthRecord = user_health_questions_answer(q_1=q_1, q_2=q_2, q_3=q_3, q_4=q_4, q_5=q_5, 
                q_6=q_6, q_7=q_7, q_8=q_8, q_9=q_9, q_10=q_10, q_11=q_11, q_12=q_12)
            healthRecord.save()

        elif (insuranceType == "Life"):
            mortgage_balance = userData["mortgage_balance"]
            other_debts_balance = userData["other_debts_balance"]
            existing_life_insurance = userData["existing_life_insurance"]
            balance_investings_savings = userData["balance_investings_savings"]

            lifeRecord = user_life_answers(mortgage_balance=mortgage_balance, other_debts_balance=other_debts_balance,
                existing_life_insurance=existing_life_insurance, balance_investings_savings=balance_investings_savings)
            lifeRecord.save()

        else:
            #disability data already stored
            a = 1

        res['success'] = True
    
    return JsonResponse(res)


@api_view(['GET'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
def getInsuranceInfo(request):
    """
        Gets insurance info for a user
        :param request:

        :return JsonResponse
            { success: bool, error: string, data: object }
    """
    requiredKeys = ['insuranceType']
    res = { 'success': False, 'error': '', data: None }

    if (validateRequest(request, requiredKeys, 'GET', res)):
        user = request.user
        user_id = user.id
        insuranceType = request.POST['insuranceType']

        if (insuranceType == "Health"):
            data = list(user_health_questions_answer.objects.filter(user_id=user.id).values())
        elif (insuranceType == "Life"):
            data = list(user_life_answers.objects.filter(user_id=user.id).values())
        else:
            data = list(user_general_answers.objects.filter(user_id=user.id).values('annual_income'))
        res['data'] = data
        res['success'] = True
    
    return JsonResponse(res)


@api_view(['GET'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
def getAllInsuranceInfo(request):
    """
        Gets all insurance info for a user
        :param request:

        :return JsonResponse
            { success: bool, error: string, data: object }
    """
    requiredKeys = []
    res = { 'success': False, 'error': '', data: None }

    if (validateRequest(request, requiredKeys, 'GET', res)):
        user = request.user
        # -- get data
        # -- add data to res['data']
        res['success'] = True
    
    return JsonResponse(res)


@api_view(['GET'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
def getInsuranceQuote(request):
    """
        Get insurance quote for a user
        :param request:

        :return JsonResponse
            { success: bool, error: string, data: object }
    """
    requiredKeys = []
    res = { 'success': False, 'error': '', data: None }

    if (validateRequest(request, requiredKeys, 'GET', res)):
        user = request.user
        # -- get data
        # -- add data to res['data']
        res['success'] = True
    
    return JsonResponse(res)


@api_view(['GET'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
def getAllInsuranceQuotes(request):
    """
        Gets all insurance quotes for a user
        :param request:

        :return JsonResponse
            { success: bool, error: string, data: object }
    """
    requiredKeys = []
    res = { 'success': False, 'error': '', 'data': None }

    if (validateRequest(request, requiredKeys, 'GET', res)):
        # -- get data
        user = request.user

        life_insurance_answers = None
        health_insurance_answers = None
        general_answers = None
        user_kids_age = None
        if (user_life_answers.objects.filter(user_id = user).exists()):
            life_insurance_answers = user_life_answers.objects.get(user_id = user)
        
        if (user_health_questions_answer.objects.filter(user_id = user).exists()):
            health_insurance_answers = user_health_questions_answer.objects.get(user_id = user)

        if (user_general_answers.objects.filter(user_id = user).exists()):
            general_answers = user_general_answers.objects.get(user_id = user)
        if (user_kids.objects.filter(user_id = user).exists()):
            user_kids_age = user_kids.objects.get(user_id = user).values("kid_age")

        health_totals = health_questions.objects.all()
        
        need_insurance, coverage_amount, term = life_insurance(life_insurance_answers, general_answers, user_kids_age)
        plan_type, deductible, critical_illness = health_insurance(health_totals, health_insurance_answers)
        benefit_amount_d, duration_h, monthly_h = disability_rec(general_answers)

        is_just_me= False
        is_me_spouse = False
        is_me_spouse_kid = False
        is_me_spouse_two_kids = False
        if (general_answers.num_kids<1 and general_answers.marital_status == 'single'):
            is_just_me= True
        elif (general_answers.marital_status=='married' and general_answers.num_kids<1):
            is_me_spouse = True
        elif(general_answers.marital_status=='married' and general_answers.num_kids==1):
            is_me_spouse_kid = True
        elif(general_answers.marital_status=='married' and general_answers.num_kids>=1):
            is_me_spouse_two_kids = True
        
        life_quotes = list(life_plan_costs.objects.filter(policy_term = term, policy_amount = coverage_amount, gender = life_insurance_answers.gender, age = general_answers.age).values())
        health_quotes = list(health_plan_costs.objects.filter(plan_type= plan_type, deductible = deductible, gender = general_answers.gender, age = general_answers.age, is_just_me = is_just_me, is_me_spouse = is_me_spouse, is_me_spouse_kid = is_me_spouse_kid, is_me_spouse_two_kids
            = is_me_spouse_two_kids).values())

        if (life_insurance_answers is not None):
            disability_quotes = list(disability_plan_costs.objects.filter(age= general_answers.age, benefit_amount = benefit_amount, monthly = monthly, gender = general_answers.gender).values())
        else:
            disability_quotes = list(disability_plan_costs.objects.filter(age= general_answers.age, benefit_amount = benefit_amount, monthly = monthly, gender = 'male').values())

        user_rec = user_recommendation(user_id = user, health_plan_id = health_quotes.health_plan_id, life_plan_id = life_quotes.life_plan_id, disability_plan_id = disability_quotes.disability_plan_id)
        user_rec.save()


        # -- add data to res['data']
        res['success'] = True
    
    return JsonResponse(res)


@api_view(['GET', 'POST']) #TODO: not sure if this is get or post
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
def generateInsuranceQuotes(request):
    """
        Generates insurance quotes for a user
        :param request:

        :return JsonResponse
            { success: bool, error: string, data: object }
    """
    requiredKeys = []
    res = { 'success': False, 'error': '', data: None }

    if (validateRequest(request, requiredKeys, 'GET', res)):
        # -- get data
        # -- add data to res['data']
        res['success'] = True

    return JsonResponse(res)