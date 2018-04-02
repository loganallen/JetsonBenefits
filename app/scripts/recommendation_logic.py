

class recommendation_logic(object):
	"""docstring for ClassName"""
	def __init__(self, arg):
		super(ClassName, self).__init__()
		self.arg = arg
	

	"""Outputs """
	def life_insurance(life_insurance_dict, general_questions_dict, user_kids_age):
		coverage_amount = 0
		term = 20
		default = True
		need_insurance = False
		if (general_questions_dict['marital_status'] =='married' or general_questions_dict['num_kids']>0):
			need_insurance = True
		for key in life_insurance_dict:
			if life_insurance_dict[key]:
				default = False

		if default:
			coverage_amount = 10*general_questions_dict['annual_income']

		else:
			min_age = min(user_kids_age)
			other_debts_balance  = life_insurance_dict['other_debts_balance']
			estimate_college_expenses = 1 #to ask
			existing_life_insurance = life_insurance_dict['existing_life_insurance']
			num_kids = general_questions_dict['num_kids']
			balance_investings_savings = life_insurance_dict['balance_investings_savings']
			general_questions_dict['annual_income']
			estimate_college_expenses = 50000
			coverage_amount = annual_income*(22-min_age)*.03 + other_debts_balance+estimate_college_expenses*4*num_kids-(existing_life_insurance-balance_investings_savings)
			#term
		return need_insurance, coverage_amount, term

def health_insurance(health_insurance_dict):
	plan_type = 'HMO'
	deductible = 'High'
	critical_illness = False
	default = True
	
	for key in health_insurance_dict:
		if health_insurance_dict[key]:
			default = False
	
	if default == False:
		HMO_total =0
		high_deductible_total = 0
		low_deductible_total = 0
		PPO_total = 0
		HSA_total = 0
		critical_illness = 0
		
		for key in health_insurance_dict:
			HMO_TOTAL = HMO_TOTAL+health_insurance_dict[key]['HMO']
			PPO_TOTAL = HMO_TOTAL+health_insurance_dict[key]['PPO']
			HSA_TOTAL = HMO_TOTAL+health_insurance_dict[key]['HSA']
			high_deductible_total = high_deductible_total+ health_insurance_dict[key]['high_deductible_total']
			low_deductible_total = low_deductible_total+ health_insurance_dict[key]['low_deductible_total']
			critical_illness = critical_illness + health_insurance_dict[key]['critical_illness']

		HMO_ratio = float(HMO_TOTAL)/ float(5)
		PPO_ratio = float(PPO_TOTAL)/ float(3)
		HSA_ratio = float(HSA_TOTAL)/ float(1.5)
		high_deductible_ratio = float(high_deductible_total)/4.5
		low_deductible_ratio =  float(low_deductible_total)/float(6)
		critical_illness_ratio = float(critical_illness)/9.5

		if HMO_ratio>=PPO_ratio:
			plan_type = 'HMO'
		
		else:
			plan_type = 'PPO'

		if high_deductible_ratio>low_deductible_ratio:
			deductible = 'High'
		else:
			deductible = 'Low'

		if critical_illness_ratio>=0.33:
			critical_illness = True

		if (health_insurance_dict['q_5']['option'] == 'No chance' and health_insurance_dict['q_6']['option'] == 'Never or just for my annual physical' and health_insurance_dict['q_7']['option'] == 'Drink some tea, it will pass'):
			plan_type = 'HMO'

		if (health_insurance_dict['q_2'] == 'Yes'):
			deductible = 'Low'

		if (health_insurance_dict['q_11']['option'] == 'Convenient time with any doctor' or health_insurance_dict['q_11']['option'] == 'I love second opinions'):
			plan_type = 'PPO'

	return plan_type, deductible, critical_illness

def disability_rec(general_questions_dict):
	benefit_amount = 0
	duration = 65

	benefit_amount = general_questions_dict['annual_income'] * .6
	monthly = float(benefit_amount) / float(12)

	return benefit_amount, duration, monthly





