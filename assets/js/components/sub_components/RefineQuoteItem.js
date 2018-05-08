import React from 'react';
import { Grid, Button, Dropdown, Checkbox } from 'semantic-ui-react';
import { MaritalStatus, InsuranceTypes } from '../../utils';

/**
 * props: {
 *  insuranceType,
 *  insuranceData,
 *  userData,
 *  updateUserData,
 *  updateInsuranceData,
 *  onUpdateQuoteClicked
 * }
 */

class RefineQuoteItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      insuranceType: this.props.insuranceType
    };
  }

  onUserDataInputChange = (key, event) => {
    // TODO: Validate inputs
    this.props.updateUserData(key, event.target.value);
  }

  onInsuranceDataInputChange = (key, event) => {
    // TODO: Validate inputs
    this.props.updateInsuranceData(insuranceType, key, event.target.value);
  }

  onKidAgeChange = (idx, event) => {
    let age = event.target.value;
    this.props.updateUserData('kid_ages', { idx: idx, age: age });
  }

  onDropdownChange = (id, value) => {
    this.props.updateInsuranceData(insuranceType, id, value);
  }

  createDropdown = (id, options) => (
    <Dropdown
      selection
      id={id}
      placeholder={options[0].text}
      className='questionDropdown'
      key={id}
      options={options}
      value={this.props.insuranceData[id]}
      onChange={(_, option) => this.onDropdownChange(id, option.value)}
    />
  );

  // TODO: Styling for mobile needs fixing
  generateChildRows = (kidAges) => {
    return kidAges.map((age, idx) => {
      return (
        <Grid.Row key={'row'+idx}>
          <Grid.Column>
          {'Child ' + (idx + 1)}
          </Grid.Column>
          <Grid.Column>
          <input
            type='text'
            id={`kidName_${idx}`}
            className='refine-input-grid'
            placeholder='John'
          />
          </Grid.Column>
          <Grid.Column>
          <input
            type='text'
              id={`kidAge_${idx}`}
            className='refine-input-grid'
            onChange={(e) => this.onKidAgeChange(idx, event)}
            value={age}
            placeholder='12'
          />
          </Grid.Column>
          <Grid.Column>
            <Checkbox defaultChecked key={`button${idx}`} />
          </Grid.Column>
        </Grid.Row>
      );
    });
  }

  healthQuestions = () => (
    <div>
      <p className='refine-title'>Great! We just need a litle more information from you</p>
      <div>
        <div className='refine-question'>
          <p>Do you take prescription medications?</p>
          {this.createDropdown('q_1', [
            {value: 'yes', text: 'yes'},
            {value: 'no', text: 'no'}])}
        </div>
        <br/>
        <div className='refine-question'>
          <p>Do you have a chronic condition?</p>
          {this.createDropdown('q_2', [
            {value: 'yes', text: 'yes'},
            {value: 'no', text: 'no'}])}
        </div>
        <br/>
        <div className='refine-question'>
          <p>How likely are you to visit your doctor for your annual physical exam?</p>
          {this.createDropdown('q_5', [
            {value: '2', text: 'likely'},
            {value: '1', text: 'somewhat likely'},
            {value: '0', text: 'not likely'}])}
        </div>
        <br/>
        <div className='refine-question'>
          <p>How many times do you visit your doctor each year?</p>
          <input
            type='number'
            id='doctorVisit'
            className='refine-input'
            onChange={(e) => this.onInsuranceDataInputChange('q_6', e)}
            value={this.props.insuranceData.q_4}
            placeholder='1'
          />
        </div>
        <br/>
        <div className='refine-question'>
          <p>There's a cold going around and the office and you wake up with a sore throat. What do you do?</p> 
          {this.createDropdown('q_7', [{value: '0', text: 'Drink some tea, it\'ll pass'},
            {value: '1', text: 'If I don\'t feel better in a few days, I\'m going to the doctor'}, 
            {value: '2', text: 'Go to the doctor immediately'}])}
        </div>
        <br/>
        <div className='refine-question'>
          <p>Your doctor asks you to come back for additional tests after your physical exam. What do you do?</p>
            {this.createDropdown('q_8', [{value: '0', text: 'Do nothing, I feel fine'},
            {value: '1', text: 'Find out cost before booking appointment'},
            {value: '2', text: 'Schedule right away'}])}
        </div>
        <br/>
        <div className='refine-question'>
          <p>How much do you worry about being diagnosed with a serious medical condition and having huge medical expenses?</p>
            {this.createDropdown('q_9', [{value: '0', text: 'Not a lot'},
            {value: '1', text: 'It crosses my mind sometimes'},
            {value: '2', text: 'Huge worry'}])}
        </div>
        <br/>
        <div className='refine-question'>
          <p>How much do you worry about the medical expenses associated with a serious accident?</p>
            {this.createDropdown('q_10', [{value: '0', text: 'Not a lot'},
            {value: '1', text: 'It crosses my mind sometimes'},
            {value: '2', text: 'Huge worry'}])}
        </div>
        <br/>
        <div className='refine-question'>
          <p>How do you schedule your doctor's appointments?</p>
            {this.createDropdown('q_11', [{value: '0', text: 'I don\'t ...'},
            {value: '1', text: 'Convenient time with any doctor'},
            {value: '2', text: 'I must see my doc'}])}
        </div>
        <br/>
        <div className='refine-question'>
          <p>How likely are you to seek out advice from a specialist?</p>
            {this.createDropdown('q_12', [{value: '0', text: 'Not likely'},
            {value: '1', text: 'If my doc says so'},
            {value: '2', text: 'I love second opinions'}])}
        </div>
      </div>
      <div className='update-button-wrapper'>
        <button className='update-button' onClick={this.props.onUpdateQuoteClicked}>UPDATE</button>
      </div>
    </div>
  )

  lifeQuestions = () => (
    <div>
      <p className='refine-title'>Great! We just need a litle more information from you</p>
      <div className='grid-wrapper'>
        {(this.props.userData.marital_status === MaritalStatus.married || (this.props.userData.kid_ages).length > 0) &&
          <Grid columns={4}>
            <Grid.Row>
              <Grid.Column>
                {/*the first column has a blank header*/}
              </Grid.Column>
              <Grid.Column>
                NAME
              </Grid.Column>
              <Grid.Column>
                AGE
              </Grid.Column>
              <Grid.Column width={3}>
                <p>Will you pay for college</p>
              </Grid.Column>
            </Grid.Row>
            {this.props.userData.marital_status === MaritalStatus.married &&
            <Grid.Row>
              <Grid.Column>
                Spouse
              </Grid.Column>
              <Grid.Column>
                <input
                  type='text'
                  id='spouseName'
                  className='refine-input-grid'
                  // onChange={(e) => this.onUserDataInputChange('spouse_name', e)}
                  // value={this.props.userData.spouse_name}
                  placeholder=''
                />
              </Grid.Column>
              <Grid.Column>
                <input
                  type='text'
                  id='spouse_age'
                  className='refine-input-grid'
                  onChange={(e) => this.onUserDataInputChange('spouse_age', e)}
                  value={this.props.userData.spouse_age}
                  placeholder='25'
                />
              </Grid.Column>
            </Grid.Row>}
          {this.generateChildRows(this.props.userData.kid_ages)}
        </Grid>}
      </div>
      <div className='refine-question'>
        <p>What is the balance of your mortgage?</p>
        <div className='refine-input-currency-wrapper'>
          <p>$</p>
          <input
            type='number'
            id='mortgageInput'
            className='refine-input-currency'
            onChange={(e) => this.onInsuranceDataInputChange('mortgage_balance', e)}
            value={this.props.insuranceData.mortgage_balance}
            placeholder='100,000'
          />
        </div>
      </div>
      <div className='refine-question'>
        <p>What is the balance of your other debts?</p>
        <div className='refine-input-currency-wrapper'>
          <p>$</p>
          <input
            type='number'
            id='debtTotal'
            className='refine-input-currency'
            onChange={(e) => this.onInsuranceDataInputChange('other_debts_balance', e)}
            value={this.props.insuranceData.other_debts_balance}
            placeholder='250,000'
            />
        </div>
      </div>
      <div className='refine-question'>
        <p>Do you have any existing life insurance (policy value)?</p>
        <div className='refine-input-currency-wrapper'>
          <p>$</p>
          <input
            type='number'
            id='existingLifeInsurance'
            className='refine-input-currency'
            onChange={(e) => this.onInsuranceDataInputChange('existing_life_Insurance', e)}
            value={this.props.insuranceData.existing_life_Insurance}
            placeholder='1,000,000'
            />
        </div>
      </div>
      <div className='refine-question'>
        <p>What is the total current balance of your investments and savings?</p>
        <div className='refine-input-currency-wrapper'>
          <p>$</p>
          <input
            type='number'
            id='investments'
            className='refine-input-currency'
            onChange={(e) => this.onInsuranceDataInputChange('balance_investings_savings', e)}
            value={this.props.insuranceData.balance_investings_savings}
            placeholder='60,000'
            />
        </div>
      </div>
      <div className='update-button-wrapper'>
        <button className='update-button' onClick={this.props.onUpdateQuoteClicked}>UPDATE</button>
      </div>
    </div>
  )

  disabilityQuestions = () =>{
    // TODO: Disability refine questions
  }

  render() {
    let content = (type => {
      switch(type) {
        case InsuranceTypes.HEALTH:
          return this.healthQuestions();
        case InsuranceTypes.LIFE:
          return this.lifeQuestions();
        case InsuranceTypes.DISABILITY:
          return this.disabilityQuestions();
        default:
          return;
      }
    })(this.state.insuranceType);

    return (
      <div>{content}</div>
    );
  }
}

export default RefineQuoteItem;
