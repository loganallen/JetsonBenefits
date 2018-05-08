from django.core import serializers
from django.forms.models import model_to_dict
from app.models import *
from django.db import models


	

	# """Outputs """
def life_insurance(life_insurance_dict = None, general_questions_dict = None, user_kids_age = None):
	coverage_amount = 0
	term = 20
	default = True
	need_insurance = False
	list_of_coverage_amount = [250000, 300000, 350000, 400000, 450000, 500000, 600000,700000]
	
	if (general_questions_dict.marital_status == 'married' or int(general_questions_dict.num_kids) >0):
		need_insurance = True

	if life_insurance_dict is not None:
		default = False

	if default:
		coverage_amount = 10*int(general_questions_dict.annual_income)

	else:
		print(user_kids_age)
		if (len(user_kids_age) < 1):
			min_age = 0
		else:
			min_age = min(list(map(int, user_kids_age)))
		other_debts_balance  = int(life_insurance_dict.other_debts_balance)
		existing_life_insurance = int(life_insurance_dict.existing_life_insurance)
		num_kids = int(general_questions_dict.num_kids)
		balance_investings_savings = int(life_insurance_dict.balance_investings_savings)
		annual_income = int(general_questions_dict.annual_income)
		estimate_college_expenses = 50000
		coverage_amount = annual_income*(22-min_age)*.03 + other_debts_balance+estimate_college_expenses*4*num_kids-(existing_life_insurance-balance_investings_savings)
			#term
	coverage_amount_final = min(list_of_coverage_amount, key=lambda x:abs(x-coverage_amount))
	return need_insurance, coverage_amount_final, term

def health_insurance_totals(health_insurance_total):
	HMO_denom = 0.0
	PPO_denom = 0.0
	HSA_denom = 0.0
	high_deduct_denom = 0.0
	low_deduct_denom = 0.0
	critical_illness_denom = 0.0

	denom_dict = {}

	for key in health_insurance_total:
		HMO_denom = float(HMO_denom) + float(key.HMO_total)
		PPO_denom = float(HMO_denom) + float(key.PPO_total)
		HSA_denom = float(HSA_denom) + float(key.HSA_total)
		high_deduct_denom = float(high_deduct_denom) + float(key.high_deductible_total)
		low_deduct_denom = float(low_deduct_denom) + float(key.low_deductible_total)
		critical_illness_denom = float(critical_illness_denom) + float(key.critical_illness_accident_policy_total)
		
	denom_dict['HMO_denom'] = HMO_denom
	denom_dict['PPO_denom'] = PPO_denom
	denom_dict['HSA_denom'] = HSA_denom
	denom_dict['high_deduct_denom'] = high_deduct_denom
	denom_dict['low_deduct_denom'] = low_deduct_denom
	denom_dict['critical_illness_denom'] = critical_illness_denom

	return denom_dict


def health_insurance(health_insurance_total, health_insurance_obj = None):
	plan_type = 'HMO'
	deductible = 'High'
	critical_illness = False
	default = True
		
	if health_insurance_obj is not None:
		default = False

		
	if default == False:
		HMO_TOTAL =0.0
		high_deductible_total = 0.0
		low_deductible_total = 0.0
		PPO_TOTAL = 0.0
		HSA_TOTAL = 0.0
		critical_illness = 0.0
		
		fields = user_health_questions_answer._meta.get_fields()
		health_insurance_dict = model_to_dict(health_insurance_obj)

		denom_dict = health_insurance_totals(health_insurance_total)
		print(denom_dict)

		for field in fields:
			value = getattr(health_insurance_obj, field.name)
			if (value != None and isinstance(value, health_question_options)):
				HMO_TOTAL = HMO_TOTAL+float(value.HMO)
				PPO_TOTAL = HMO_TOTAL+float(value.PPO)
				HSA_TOTAL = HSA_TOTAL+float(value.HSA)
				high_deductible_total = high_deductible_total+ float(value.high_deductible)
				low_deductible_total = low_deductible_total+ float(value.low_deductible)
				critical_illness = critical_illness + float(value.critical_illness)


		HMO_ratio = float(HMO_TOTAL) / float(denom_dict['HMO_denom'])
		PPO_ratio = float(PPO_TOTAL) / float(denom_dict['PPO_denom'])
		HSA_ratio = float(HSA_TOTAL) / float(denom_dict['HSA_denom'])
		high_deductible_ratio = float(high_deductible_total) / float(denom_dict['high_deduct_denom'])
		low_deductible_ratio =  float(low_deductible_total) / float(denom_dict['low_deduct_denom'])
		critical_illness_ratio = float(critical_illness) / float(denom_dict['critical_illness_denom'])

		if (HMO_ratio >= PPO_ratio):
			plan_type = 'HMO'
			
		else:
			plan_type = 'PPO'

		if (high_deductible_ratio > low_deductible_ratio):
			deductible = 'High'
		else:
			deductible = 'Low'

		if (critical_illness_ratio >= 0.33):
			critical_illness = True

		if (health_insurance_obj.q_5.option == 'No chance' and health_insurance_dict.q_6.option == 'Never or just for my annual physical' and health_insurance_dict.q_7.option == 'Drink some tea, it will pass'):
			plan_type = 'HMO'

		if (health_insurance_obj.q_2.option == 'Yes'):
			deductible = 'Low'

		if (health_insurance_obj.q_11.option == 'Convenient time with any doctor' or health_insurance_obj.q_11.option == 'I love second opinions'):
			plan_type = 'PPO'

	return plan_type, deductible, critical_illness

def disability_rec(general_questions_dict):
	benefit_amount = 0
	duration = 65

	benefit_amount = int(general_questions_dict.annual_income) * .6
	monthly = float(benefit_amount) / float(12)

	return benefit_amount, duration, monthly





