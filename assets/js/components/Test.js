/*
Use this [Test] component to easily test API calls. Change {testFunc} to 
take the proper arguments for whichever action you want to test. Look at
'/js/actions/index.js' for the API functions. The output will be logged to
the console. You must be an authenticated user to test the API calls (i.e. logged in)
*/

import React from 'react';
import { connect } from 'react-redux';

import Menu from './Menu';
import Actions from '../actions';
import { isLoggedIn, authToken } from '../auth';

class Test extends React.Component {
  componentWillMount() {
    if (isLoggedIn()) {
      this.props.loadUserData(authToken());
    }
  }

  handleAPIclick = () => {
    // Pass in the correct function arguments here
    this.props.testFunc(
      authToken(),
      // {
      //   GENERAL:{ 
      //     age: 40, 
      //     zipcode: '14850', 
      //     marital_status: 'married', 
      //     health_condition: 'good', 
      //     annual_income: '60000', 
      //     spouse_annual_income: '0', 
      //     num_kids: '3', 
      //     kid_ages: [1,2,3],
      //     gender: 'female' 
      //   },
      //   HEALTH: {
      //     q_1: 'No',
      //     q_2: 'No', 
      //     q_5: 'Might go',
      //     q_6: 'Never or just for my annual physical', 
      //     q_7: "Drink some tea, it'll pass", 
      //     q_8: 'Find out cost before booking appt', 
      //     q_9: 'It crosses my mind sometimes.', 
      //     q_10: 'It crosses my mind sometimes.',
      //     q_11: 'Convenient time with any doctor',
      //     q_12: 'If my doc says so'
      //   }, 
      //   LIFE: {
      //     mortgage_balance: 20000,
      //     other_debts_balance: 500,
      //     existing_life_insurance:100,
      //     balance_investings_savings: 1000,
      //   }
      // }
      // {age: 27, zipcode: '14850', marital_status: 'married', health: 'good', annual_income: '10000', spouse_annual_income: '0', spouse_age: '25', num_kids: '3', gender: 'female', kid_ages: [1,2,3] }
      // 'LIFE',
      // {
      //   q_1: 'No',
      //   q_2: 'No', 
      //   q_5: 'Might go',
      //   q_6: 'Never or just for my annual physical', 
      //   q_7: "Drink some tea, it'll pass", 
      //   q_8: 'Find out cost before booking appt', 
      //   q_9: 'It crosses my mind sometimes.', 
      //   q_10: 'It crosses my mind sometimes.',
      //   q_11: 'Convenient time with any doctor',
      //   q_12: 'If my doc says so'
      // }
      // {
      //   mortgage_balance: 20000,
      //   other_debts_balance: 500,
      //   existing_life_insurance:100,
      //   balance_investings_savings: 1000,
      // }
    );
  }

  render() {
    console.log(this.props.insuranceQuotes);
    return (
      <div>
        <Menu history={this.props.history} />
        <h1>API Test Componenet</h1>
        <button onClick={this.handleAPIclick}>Make API Call</button>
        <br/><br/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // Choose which API function to test here

  loadUserData: (token) => dispatch(Actions.fetchUserInfo(token)),
  testFunc: (token) => dispatch(Actions.fetchAllInsuranceQuotes(token))

});

export default connect(state => state.app, mapDispatchToProps)(Test);
