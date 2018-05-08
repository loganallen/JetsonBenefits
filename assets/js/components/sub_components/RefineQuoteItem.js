import React from 'react';
import { Grid, Button, Dropdown, Checkbox } from 'semantic-ui-react';
import { MaritalStatus, InsuranceTypes } from '../../utils';

class RefineQuoteItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      insuranceType: this.props.insuranceType
    };
  }

  onInputChange = (key, event) => {
    // TODO: Validate inputs
    this.props.updateUserData(key, event.target.value);
  }

  onKidAgeChange = (idx, event) => {
    let age = event.target.value;
    this.props.updateUserData('kid_ages', { idx: idx, age: age });
  }

  onDropdownChange = (value, id) => {
    this.props.updateUserData(`dropdown${id}`, value);
  }

  createDropdown = (options, id) => (
    <Dropdown
      selection
      id={`dropdown${id}`}
      placeholder={options[0].text}
      className='questionDropdown'
      key={`dropdown${id}`}
      options={options}
      value={this.props.userData[`dropdown${id}`]}
      onChange={(_, option) => this.onDropdownChange(option.value, id)}
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
            id={'kidName'+ idx}
            className='refine-input-grid'
            placeholder={''}
          />
          </Grid.Column>
          <Grid.Column>
          <input
            type='text'
            id={'kidAge'+ idx}
            className='refine-input-grid'
            onChange={(e) => this.onKidAgeChange(idx,event)}
            value={age}
            placeholder={''}
          />
          </Grid.Column>
          <Grid.Column>
            <Checkbox defaultChecked key={'button' + idx} />
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
          {this.createDropdown([
            {value: 'yes', text: 'yes'},
            {value: 'no', text: 'no'}], 0)}
        </div>
        <br/>
        <div className='refine-question'>
          <p>Do you have a chronic condition?</p>
          {this.createDropdown([
            {value: 'yes', text: 'yes'},
            {value: 'no', text: 'no'}], 1)}
        </div>
        <br/>
        <div className='refine-question'>
          <p>How likely are you to visit your doctor for your annual physical exam?</p>
          {this.createDropdown([
            {value: '2', text: 'likely'},
            {value: '1', text: 'somewhat likely'},
            {value: '0', text: 'not likely'}], 2)}
        </div>
        <br/>
        <div className='refine-question'>
          <p>How many times do you visit your doctor each year?</p>
          <input
            type='number'
            id='doctorVisit'
            className='refine-input'
            onChange={(e) => this.onInputChange('doctorVisit', e)}
            value={this.props.userData.doctorVisit}
            placeholder='1'
          />
        </div>
        <br/>
        <div className='refine-question'>
          <p>There's a cold going around and the office and you wake up with a sore throat. What do you do?</p> 
          {this.createDropdown([{value: '0', text: 'Drink some tea, it\'ll pass'},
            {value: '1', text: 'If I don\'t feel better in a few days, I\'m going to the doctor'}, 
            {value: '2', text: 'Go to the doctor immediately'}], 4)}
        </div>
        <br/>
        <div className='refine-question'>
          <p>Your doctor asks you to come back for additional tests after your physical exam. What do you do?</p>
            {this.createDropdown([{value: '0', text: 'Do nothing, I feel fine'},
            {value: '1', text: 'Find out cost before booking appointment'},
            {value: '2', text: 'Schedule right away'}], 5)}
        </div>
        <br/>
        <div className='refine-question'>
          <p>How much do you worry about being diagnosed with a serious medical condition and having huge medical expenses?</p>
            {this.createDropdown([{value: '0', text: 'Not a lot'},
            {value: '1', text: 'It crosses my mind sometimes'},
            {value: '2', text: 'Huge worry'}], 6)}
        </div>
        <br/>
        <div className='refine-question'>
          <p>How much do you worry about the medical expenses associated with a serious accident?</p>
            {this.createDropdown([{value: '0', text: 'Not a lot'},
            {value: '1', text: 'It crosses my mind sometimes'},
            {value: '2', text: 'Huge worry'}], 7)}
        </div>
        <br/>
        <div className='refine-question'>
          <p>How do you schedule your doctor's appointments?</p>
            {this.createDropdown([{value: '0', text: 'I don\'t ...'},
            {value: '1', text: 'Conveinent time with any doctor'},
            {value: '2', text: 'I must see my doc'}], 8)}
        </div>
        <br/>
        <div className='refine-question'>
          <p>How likely are you to seek out advice from a specialist?</p>
            {this.createDropdown([{value: '0', text: 'Not likely'},
            {value: '1', text: 'If my doc says so'},
            {value: '2', text: 'I love second opinions'}], 9)}
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
      {
        (this.props.userData.marital_status === MaritalStatus.married || (this.props.userData.kid_ages).length > 0)
        && <Grid columns={4}>
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
          <Grid.Column 
            width={3}>
          <p>Will you pay for college</p>
          </Grid.Column>
        </Grid.Row>
        {this.props.userData.marital_status === MaritalStatus.married && <Grid.Row>
          <Grid.Column>
          Spouse
          </Grid.Column>
          <Grid.Column>
          <input
            type='text'
            id='spouseName'
            className='refine-input-grid'
            onChange={(e) => this.onInputChange('spouseName', e)}
            value={this.props.userData.spouseName}
            placeholder=''
          />
          </Grid.Column>
          <Grid.Column>
          <input
            type='text'
            id='spouse_age'
            className='refine-input-grid'
            onChange={(e) => this.onInputChange('spouse_age', e)}
            value={this.props.userData.spouse_ge}
            placeholder=''
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
            onChange={(e) => this.onInputChange('mortgageBalance', e)}
            value={this.props.userData.mortgageBalance}
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
            onChange={(e) => this.onInputChange('debtTotal', e)}
            value={this.props.userData.debtTotal}
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
            onChange={(e) => this.onInputChange('existingLifeInsurance', e)}
            value={this.props.userData.existingLifeInsurance}
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
            onChange={(e) => this.onInputChange('investments', e)}
            value={this.props.userData.investments}
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
    /* nothing */
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
