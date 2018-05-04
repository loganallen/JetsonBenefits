from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.http import require_GET
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.core import serializers


from django.views.decorators.csrf import ensure_csrf_cookie


from app.models import *
import json
from app.scripts.recommendation_logic import *
from django.forms.models import model_to_dict

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

def asInt(value):
    return 0 if value == '' else int(value)


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
        age = asInt(userData['age'])
        zipcode = asInt(userData['zipcode'])
        num_kids = asInt(userData['num_kids'])
        marital_status = userData['marital_status']
        spouse_annual_income = asInt(userData['spouse_annual_income'])
        annual_income = asInt(userData['annual_income'])
        kid_ages = userData['kid_ages']
        spouse_age = asInt(userData['spouse_age'])
        health_condition = userData['health_condition']
        
        getAnswers = user_general_answers(
            user_id = user,
            age = age,
            zipcode = zipcode,
            num_kids = num_kids,
            marital_status = marital_status,
            spouse_annual_income = spouse_annual_income,
            annual_income = annual_income,
            spouse_age = spouse_age,
            health_condition = health_condition
        )
        # getAnswers = user_general_answers(user_id=user, age=age, zipcode=zipcode)
        getAnswers.save()

        i = 0
        while(i<len(kid_ages)):
            age = user_kids(user_id = user, kid_age = asInt(kid_ages[i]), will_pay_for_college = 'yes')
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
    res = { 'success': False, 'error': '', 'data': None }

    if (validateRequest(request, requiredKeys, 'GET', res)):
        user = request.user
        userData = list(user_general_answers.objects.filter(user_id=user.id).values())[0]
        # TODO: Grab kid's ages from table and insert as array in userData['kid_ages']
        res['data'] = userData
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

        if (insuranceType == 'HEALTH'):
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

        elif (insuranceType == 'LIFE'):
            mortgage_balance = userData['mortgage_balance']
            other_debts_balance = userData['other_debts_balance']
            existing_life_insurance = userData['existing_life_insurance']
            balance_investings_savings = userData['balance_investings_savings']

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
        insuranceType = json.loads(request.POST['insuranceType'])

        if (insuranceType == 'HEALTH'):
            data = list(user_health_questions_answer.objects.filter(user_id=user.id).values())
        elif (insuranceType == 'LIFE'):
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
    res = { 'success': False, 'error': '', 'data': None }

    if (validateRequest(request, requiredKeys, 'GET', res)):
        user = request.user
        # -- get data
        health_info = {}
        life_info = {}
        disability_info = {}
        if (user_health_questions_answer.objects.filter(user_id = user.id).exists()):
            health_info = user_health_questions_answer.objects.filter(user_id = user.id).values()[0]
        if (user_life_answers.objects.filter(user_id = user.id).exists()):
            life_info = user_life_answers.objects.filter(user_id = user.id).values()[0]
        if (user_general_answers.objects.filter(user_id=user.id).exists()):
            disability_info = user_general_answers.objects.filter(user_id=user.id).values('annual_income')[0]
        # -- add data to res['data']
        res['data'] = {'HEALTH': health_info, 'LIFE': life_info, 'DISABILITY': disability_info}
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
    res = { 'success': False, 'error': '', 'data': None }

    if (validateRequest(request, requiredKeys, 'GET', res)):
        user = request.user
        # -- get user recommendation
        gen_answers = user_general_answers.objects.filter(user_id=user.id)[0]

        health_info = None
        life_info = None
        if (user_health_questions_answer.objects.filter(user_id = user.id).exists()):
            health_info = user_health_questions_answer.objects.filter(user_id = user.id)[0]
        if (user_life_answers.objects.filter(user_id = user.id).exists()):
            life_info = user_life_answers.objects.filter(user_id = user.id)[0]
        if (user_general_answers.objects.filter(user_id=user.id).exists()):
            disability_info = user_general_answers.objects.filter(user_id=user.id).values('annual_income')[0]
        if (user_kids.objects.filter(user_id = user).exists()):
            user_kids_age = user_kids.objects.values_list('kid_age').filter(user_id = user)

        is_married = False
        num_kids = 0
        if (gen_answers.marital_status == 'single'):
            is_married= True
        if (gen_answers.num_kids>2):
            num_kids = 2
        age = str(min([25, 35], key=lambda x:abs(x-gen_answers.age)))

        insurance_type = json.loads(request.GET['insuranceType'])
        if (insurance_type == 'HEALTH'):
            # get data
            health_totals = health_questions.objects.all()
            plan_type, deductible, critical_illness = health_insurance(health_totals, health_info)

            health_quote = None
            if (health_plan_costs.objects.filter(plan_type= plan_type, deductible_level = deductible, has_spouse= is_married, num_kids = num_kids).exists()):
                health_quote = health_plan_costs.objects.filter(plan_type= plan_type, deductible_level = deductible, has_spouse= is_married, num_kids = num_kids).values()[0]
                user_rec = user_recommendation.objects.filter(user_id=user.id)
                user_rec.health_plan_id = health_quote.health_plan_id
                user_rec.save()

            res['data'] = health_quote
            res['success'] = True
        elif (insurance_type == 'LIFE'):
            # get data
            need_insurance, coverage_amount, term = life_insurance(life_info, gen_answers, user_kids_age)

            life_quote = None
            if (life_plan_costs.objects.filter(policy_term = term, policy_amount = coverage_amount, gender = 'male', age = age).exists()):
                life_quote = life_plan_costs.objects.filter(policy_term = term, policy_amount = coverage_amount, gender = 'male', age = age).values()[0]
                user_rec = user_recommendation.objects.filter(user_id=user.id)
                user_rec.health_plan_id = life_quote.life_plan_id
                user_rec.save()

            res['data'] = life_quote
            res['success'] = True
        elif (insurance_type == 'DISABILITY'):
            # get data
            benefit_amount_d, duration_d, monthly_d = disability_rec(gen_answers)

            disability_quote = {'benefit_amount': benefit_amount_d, 'duration': duration_d, 'monthly': monthly_d}

            user_rec = user_recommendation.objects.filter(user_id=user.id)
            user_rec.disabililty_plan_id = None
            user_rec.update()

            res['data'] = disability_quote
            res['success'] = True
        else:
            res['error'] = 'invalid insurance type'
    
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
    requiredKeys = ['userData']
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
            user_kids_age = user_kids.objects.values_list('kid_age').filter(user_id = user)

        health_totals = health_questions.objects.all()
        
        need_insurance, coverage_amount, term = life_insurance(life_insurance_answers, general_answers, user_kids_age)
        plan_type, deductible, critical_illness = health_insurance(health_totals, health_insurance_answers)
        benefit_amount_d, duration_d, monthly_d = disability_rec(general_answers)

        is_married= False
        num_kids = general_answers.num_kids

        if (general_answers.marital_status == 'single'):
            is_married= True
        if (general_answers.num_kids>2):
            num_kids = 2
        age = str(min([25, 35], key=lambda x:abs(x-general_answers.age)))
        health_quotes = health_plan_costs.objects.filter(plan_type= plan_type, deductible_level = deductible, has_spouse= is_married, num_kids = num_kids)
        health_quote = health_quotes[0]
        life_quotes = life_plan_costs.objects.filter(policy_term = term, policy_amount = coverage_amount, gender = 'male', age = age)
        # disability_quotes = list(disability_plan_costs.objects.filter(age= age, benefit_amount = benefit_amount_d, monthly = monthly_d, gender = 'male').values())
        if (life_insurance_answers is not None):
            life_quotes = life_plan_costs.objects.filter(policy_term = term, policy_amount = coverage_amount, gender = life_insurance_answers.gender, age = age)
            # disability_quotes = disability_plan_costs.objects.filter(age = age, benefit_amount = benefit_amount_d, monthly = monthly_d, gender = general_answers.gender).values()
        life_quote = life_quotes[0]
        disability_quote = {'benefit_amount': benefit_amount_d, 'duration': duration_d, 'monthly': monthly_d}

        user_rec = user_recommendation(user_id = user, health_plan_id = health_quotes[0], life_plan_id = life_quotes[0], disability_plan_id = None)
        user_rec.save()

        data = {'LIFE': model_to_dict(life_quote), 'HEALTH': model_to_dict(health_quote), 'DISABILITY': disability_quote}

        res['success'] = True
        res['data'] = data
    
    return JsonResponse(res)

@require_GET
def generateInsuranceQuotes(request):
    """
        Generates insurance quotes for a user
        :param request:

        :return JsonResponse
            { success: bool, error: string, data: object }
    """
    requiredKeys = ['userData']
    res = { 'success': False, 'error': '', 'data': None }

    if (validateRequest(request, requiredKeys, 'GET', res)):
        userData = json.loads(request.GET['userData'])

        general_post = userData['GENERAL']
        life_post = userData['LIFE']
        health_post = userData['HEALTH']

        life_obj = None
        health_obj = None
        user_kids_ages = general_post['kid_ages']
        del general_post['kid_ages']
        general_post['user_id'] = User()

        general_obj = user_general_answers(**general_post)
        if (life_post != {}):
            life_post['user_id'] = User()
            life_obj = user_life_answers(**life_post)
        if (health_post != {}):
            health_post['user_id'] = User()
            health_obj = user_health_questions_answer(**health_post)
        # -- add data to res['data']
        health_totals = health_questions.objects.all()

        need_insurance, coverage_amount, term = life_insurance(life_obj, general_obj, user_kids_ages)
        plan_type, deductible, critical_illness = health_insurance(health_totals, health_obj)
        benefit_amount_d, duration_d, monthly_d = disability_rec(general_obj)

        is_married= False
        num_kids = general_post['num_kids']

        if (general_obj.marital_status == 'single'):
            is_married= True
        if (int(general_obj.num_kids)>2):
            num_kids = 2
        age = str(min([25, 35], key=lambda x:abs(x-int(general_obj.age))))
        health_quotes = health_plan_costs.objects.filter(plan_type= plan_type, deductible_level = deductible, has_spouse= is_married, num_kids = num_kids)
        health_quote = health_quotes[0]
        # print(health_quotes)
        life_quotes = life_plan_costs.objects.filter(policy_term = term, policy_amount = coverage_amount, gender = 'male', age = age)
        # disability_quotes = list(disability_plan_costs.objects.filter(age= age, benefit_amount = benefit_amount_d, monthly = monthly_d, gender = 'male').values())
        if (life_obj is not None):
            life_quotes = life_plan_costs.objects.filter(policy_term = term, policy_amount = coverage_amount, gender = life_obj.gender, age = age)
            # disability_quotes = disability_plan_costs.objects.filter(age = age, benefit_amount = benefit_amount_d, monthly = monthly_d, gender = general_answers.gender).values()
        life_quote = life_quotes[0]
        disability_quote = {'benefit_amount': benefit_amount_d, 'duration': duration_d, 'monthly': monthly_d}
             
        data = {'LIFE': model_to_dict(life_quote), 'HEALTH': model_to_dict(health_quote), 'DISABILITY': disability_quote}

        # -- add data to res['data']
        res['success'] = True
        res['data'] = data

    return JsonResponse(res)