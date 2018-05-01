import unittest

class TestClassName(unittest.TestCase):

	#def test_marital_status(self,ans):
	#	self.assertEqual(ans,'married')

	#def test_num_kids(self,ans):
	#	self.assertEqual(ans,0)

	def test_life_insurance(self):
		self.assertEqual(life_insurance(null,null,10), False)
		self.assertIs(life_insurance(null,10,10), False )
		self.assertEqual(life_insurance(null,10,null), False)

		#test.testEqual(life_insurance_dict[marital_status],'married')

		ans_marital_status='married'

		
		#if ans_marital_status not in life_insurance_dict.values()
		#	print("Fail test case")

		#if ans_num_kids not in life_insurance_dict.values()
		#	print("Failed - num kids")
		
		test_ans1a = {'marital_status':'married'}
		test_ans1b = {'num_kids':'1'}
		self.assertEqual(life_insurance(test_ans1a,test_ans1b,null),'True')

		test_ans2a= {'marital_status':'unmar'}
		test_ans2b= {'num_kids':'1'}
		self.assertEquals(life_insurance(test_ans2,test_ans2b,null),'True')

		with self.assertRaises(TypeError):
			print("Fail")


	def test_health_insurance(self):
		self.assertEqual(health_insurance(null,10,null), False)
		self.assertEqual(health_insurance(10,null,null), False)
		self.assertEqual(health_insurance(null,null,10), False)

		test_ans3 = {'HMO_total':'10', 'PPO_total':'20'}
		self.assertEqual(health_insurance(test_ans3),'PPO')

		test_ans4 = {'high_deductible_ratio':'10', 'low_deductible_ratio':'5'}
		self.assertEqual(health_insurance(test_ans4), 'High')

		test_ans5 = {'critical_illness':'1'}
		self.assertEqual(health_insurance(test_ans5), 'True')

		test_ans6 = {'q2':'No'}
		self.assertEqual(health_insurance(test_ans6), False)


	def test_disability_rec(self):
		self.assertEqual(disability_rec(null),False)


def main():
	unittest.main()

if __name__ == '__main__':
	main()



