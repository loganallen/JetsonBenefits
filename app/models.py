from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User
# Create your models here.

yes_no = (
	('y', 'yes'),
	('n', 'no')
)

gender_options = (
	('m', 'male'),
	('f', 'female')
)

class user_general_answers(models.Model):
	status_options = (
		('single', 'single'),
		('married', 'married'),
		('divorced', 'divorced'),
		('widowed', 'widowed')
	)

	health_options = (
		('Excellent', 'Excellent'),
		('Good', 'Good'),
		('Meh', 'Meh'),
		('Poor', 'Poor')
	)

	user_id = models.OneToOneField(
			User,
			on_delete = models.CASCADE,
			primary_key = True,
		)
	marital_status = models.CharField(max_length = 8, choices = status_options)
	zipcode = models.IntegerField()
	num_kids = models.IntegerField()
	annual_income = models.IntegerField()
	spouse_annual_income = models.IntegerField()
	health = models.CharField(max_length = 9, choices = health_options)
	age = models.IntegerField()

class user_life_answers(models.Model):
	mortgage_balance = models.IntegerField()
	other_debts_balance = models.IntegerField()
	existing_life_insurance = models.IntegerField()
	balance_investings_savings = models.IntegerField()
	user_id = models.OneToOneField(
			User,
			on_delete = models.CASCADE,
			primary_key = True,
		)

class user_kids(models.Model):
	user_id = models.ForeignKey(User, on_delete = models.CASCADE)
	kid = models.IntegerField(primary_key = True)
	kid_age = models.IntegerField()
	will_pay_for_college = models.CharField(max_length = 8, choices = yes_no)

class health_plan_costs(models.Model):
	medal_options = (
		('Gold', 'Gold'),
		('Silver', 'Silver'),
		('Bronze', 'Bronze')
	)
	type_options = (
		('HMO', 'HMO'),
		('PPO', 'PPO')
	)
	level_options = (
		('High', 'High'),
		('Low', 'Low')
	)
	health_plan_id = models.IntegerField(primary_key = True)
	carrier= models.CharField(max_length = 250)
	plan_name = models.CharField(max_length = 250)
	medal = models.CharField(max_length = 8, choices = medal_options)
	plan_type = models.CharField(max_length = 8, choices = type_options)
	monthly_premium = models.IntegerField()
	deductible = models.IntegerField()
	deductible_level = models.CharField(max_length = 8, choices = level_options)
	is_just_me = models.BooleanField(default = True)
	is_me_spouse = models.BooleanField(default = False)
	is_me_spouse_kid = models.BooleanField(default = False)
	is_me_spouse_two_kids = models.BooleanField(default = False)

class life_plan_costs(models.Model):
	age_options = (
		('25', '25 year old healthy'),
		('35', '35 year old healthy')
	)
	life_plan_id = models.IntegerField(primary_key = True)
	carrier= models.CharField(max_length = 250)
	policy_term = models.IntegerField()
	policy_amount = models.IntegerField()
	gender = models.CharField(max_length = 8, choices = gender_options)
	age = models.CharField(max_length = 20, choices = age_options)
	monthly = models.IntegerField();

class disability_plan_costs(models.Model):
	age_options = (
		('25', '25 year old office worker'),
		('35', '35 year old office worker'),
		('45', '35 year old office worker ')
	)
	disability_plan_id = models.IntegerField(primary_key = True)
	benefit_amount = models.IntegerField()
	age = models.CharField(max_length = 20, choices = age_options)
	gender = models.CharField(max_length = 30, choices = gender_options)
	monthly = models.CharField(max_length = 200)

class user_recommendation(models.Model):
	recommendation_id = models.IntegerField(primary_key = True)
	user_id = models.OneToOneField(
		User,
		on_delete = models.CASCADE,
	)
	health_plan_id = models.OneToOneField(
		health_plan_costs,
		on_delete = models.CASCADE
	)
	disability_plan_id = models.OneToOneField(
		disability_plan_costs,
		on_delete = models.CASCADE
	)
	life_plan_id = models.OneToOneField(
		life_plan_costs,
		on_delete = models.CASCADE
	)

class health_questions(models.Model):
	health_question_id = models.IntegerField(primary_key = True)
	question = models.CharField(max_length = 500)
	high_deductible_total = models.IntegerField()
	low_deductible_total = models.IntegerField()
	HMO_total = models.IntegerField()
	PPO_total = models.IntegerField()
	HSA_total = models.IntegerField()
	critical_illness_accident_policy_total = models.IntegerField()

class health_question_options(models.Model):
	health_question_option_id = models.IntegerField(primary_key = True)
	question_id = models.ForeignKey(
		health_questions,
		on_delete = models.CASCADE
	)
	option = models.CharField(max_length = 500)
	high_deductible = models.FloatField()
	low_deductible = models.FloatField()
	HMO = models.FloatField()
	PPO = models.FloatField()
	HSA = models.FloatField()
	critical_illness = models.FloatField()

class user_health_questions_answer(models.Model):
	user_id = models.OneToOneField(
		User,
		on_delete = models.CASCADE,
		primary_key = True
	)
	q_1 = models.OneToOneField(health_question_options, related_name = '+', default = None, on_delete = models.CASCADE)
	q_1 = models.OneToOneField(health_question_options, related_name = '+', default = None, on_delete = models.CASCADE)
	q_1 = models.OneToOneField(health_question_options, related_name = '+', default = None, on_delete = models.CASCADE)
	q_1 = models.OneToOneField(health_question_options, related_name = '+', default = None, on_delete = models.CASCADE)
	q_1 = models.OneToOneField(health_question_options, related_name = '+', default = None, on_delete = models.CASCADE)
	q_1 = models.OneToOneField(health_question_options, related_name = '+', default = None, on_delete = models.CASCADE)
	q_1 = models.OneToOneField(health_question_options, related_name = '+', default = None, on_delete = models.CASCADE)
	q_1 = models.OneToOneField(health_question_options, related_name = '+', default = None, on_delete = models.CASCADE)
	q_1 = models.OneToOneField(health_question_options, related_name = '+', default = None, on_delete = models.CASCADE)
	q_1 = models.OneToOneField(health_question_options, related_name = '+', default = None, on_delete = models.CASCADE)
	q_1 = models.OneToOneField(health_question_options, related_name = '+', default = None, on_delete = models.CASCADE)
	q_1 = models.OneToOneField(health_question_options, related_name = '+', default = None, on_delete = models.CASCADE)







