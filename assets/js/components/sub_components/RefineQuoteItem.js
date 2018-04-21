import React from 'react';
import { } from 'semantic-ui-react';

class RefineQuoteItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      insuranceType = this.props.insuranceType
    };
  }

  onInputChange = (key, event) => {
      // TODO: Validate inputs
      this.props.updateUserData(key, event.target.value);
    }

  healthQuestions = () =>{
    /*
    Do you take prescription medications
    Do you have a chronic condition
    How likely are you to visit your doctor for your annual physical exam
    How many times do you visit your doctor each year
    There's a cold going around and the office and you wake up with a sore throat. What do you do 
      {answers: Drink some tea, it'll pass | If I don't feel better in a few days, I'm going to the doctor | Go to the doctor immediately}
    Your doctor asks you to come back for additional tests after your physical exam. What do you do?
      {answers: Do nothing, I feel fine | Find out cost before booking appointment | Schedule right away}
    How much do you worry about being diagnosed with a serious medical condition and having huge medical expenses?
      {answers: Not a lot | It crosses my mind sometimes | Huge worry}
    How much do you worry about the medical expenses associated with a serious accident?
      {answers: Not a lot | It crosses my mind sometimes | Huge worry}
    How do you schedule your doctor's appointments?
      {answers: I don't ... | Conveinent time with any doctor | I must see my doc}
    How likely are you to seek out advice from a specialist?
      {answers: Not likely | If my doc says so | I love second opinions}
    */
  }

  lifeQuestions = () =>{
    /*
    child, name, age, pay for college
    What is the balance of your mortgage
    What is the balance of your other debts
    Do you have any existing life insurance (polciy value)
    What is the total current balance of your investments and savings
    */
  }

  disabilityQuestions = () =>{
    /NA

  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default RefineQuoteItem;
