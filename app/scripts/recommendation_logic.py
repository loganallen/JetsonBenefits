

class ClassName(object):
	"""docstring for ClassName"""
	def __init__(self, arg):
		super(ClassName, self).__init__()
		self.arg = arg
	

	"""Outputs """
	def life_insurance(life_insurance_dict, general_questions_dict, user_kids_age):
		coverage_amount = 0
		term = 0
		default = True
		need_insurance = False
		if (general_questions_dict['marital_status'] =='married' or general_questions_dict['num_kids']>0):
			need_insurance = True
		for key in life_insurance_dict:
			if life_insurance_dict[key]:
				default = False

		if default:
			coverage_amount = 10*general_questions_dict['annual_income']
			term = 20
		else:
			min_age = min(user_kids_age)
			other_debts_balance  = life_insurance_dict['other_debts_balance']
			estimate_college_expenses = 1 #to ask
			existing_life_insurance = life_insurance_dict['existing_life_insurance']
			num_kids = general_questions_dict['num_kids']
			balance_investings_savings = life_insurance_dict['balance_investings_savings']
			general_questions_dict['annual_income']
			coverage_amount = annual_income*(22-min_age)*.03 + other_debts_balance+estimate_college_expenses*4*num_kids-(existing_life_insurance-balance_investings_savings)
			#term
		return need_insurance, coverage_amount, term




