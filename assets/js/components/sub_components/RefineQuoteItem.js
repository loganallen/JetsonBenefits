import React from 'react';
import { Grid, Button, Dropdown, Checkbox } from 'semantic-ui-react';

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
      this.props.updateUserData('kidAges', { idx: idx, age: age });
    }

  onDropdownChange = (value, id) => {
    console.log(id);
    console.log(this.props.userData[`dropdown${id}`]);
      this.props.updateUserData(`dropdown${id}`, value);
    }

  createDropdown = (answers, id) => (
    <Dropdown
      selection
      id={`dropdown${id}`}
      placeholder={`${answers[0].text}`}
      className={'questionDropdown'}
      key={`dropdown${id}`}
      options={answers}
      value={this.props.userData[`dropdown${id}`]}
      onChange={(_, option) => this.onDropdownChange(option.value, id)}
    />
  );

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
      <p class='refine-title'>Great! We just need a litle more information from you</p>
      <div>
        <div class='refine-question'>
          <p>Do you take prescription medications?</p>
          {this.createDropdown([
            {value: 'yes', text: 'yes'},
            {value: 'no', text: 'no'}], 0)}
        </div>
        <br/>
        <div class='refine-question'>
          <p>Do you have a chronic condition?</p>
          {this.createDropdown([
            {value: 'yes', text: 'yes'},
            {value: 'no', text: 'no'}], 1)}
        </div>
        <br/>
        <div class='refine-question'>
          <p>How likely are you to visit your doctor for your annual physical exam?</p>
          {this.createDropdown([
            {value: '2', text: 'likely'},
            {value: '1', text: 'somewhat likely'},
            {value: '0', text: 'not likely'}], 2)}
        </div>
        <br/>
        <div class='refine-question'>
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
        <div class='refine-question'>
          <p>There's a cold going around and the office and you wake up with a sore throat. What do you do?</p> 
          {this.createDropdown([{value: '0', text: 'Drink some tea, it\'ll pass'},
            {value: '1', text: 'If I don\'t feel better in a few days, I\'m going to the doctor'}, 
            {value: '2', text: 'Go to the doctor immediately'}], 4)}
        </div>
        <br/>
        <div class='refine-question'>
          <p>Your doctor asks you to come back for additional tests after your physical exam. What do you do?</p>
            {this.createDropdown([{value: '0', text: 'Do nothing, I feel fine'},
            {value: '1', text: 'Find out cost before booking appointment'},
            {value: '2', text: 'Schedule right away'}], 5)}
        </div>
        <br/>
        <div class='refine-question'>
          <p>How much do you worry about being diagnosed with a serious medical condition and having huge medical expenses?</p>
            {this.createDropdown([{value: '0', text: 'Not a lot'},
            {value: '1', text: 'It crosses my mind sometimes'},
            {value: '2', text: 'Huge worry'}], 6)}
        </div>
        <br/>
        <div class='refine-question'>
          <p>How much do you worry about the medical expenses associated with a serious accident?</p>
            {this.createDropdown([{value: '0', text: 'Not a lot'},
            {value: '1', text: 'It crosses my mind sometimes'},
            {value: '2', text: 'Huge worry'}], 7)}
        </div>
        <br/>
        <div class='refine-question'>
          <p>How do you schedule your doctor's appointments?</p>
            {this.createDropdown([{value: '0', text: 'I don\'t ...'},
            {value: '1', text: 'Conveinent time with any doctor'},
            {value: '2', text: 'I must see my doc'}], 8)}
        </div>
        <br/>
        <div class='refine-question'>
          <p>How likely are you to seek out advice from a specialist?</p>
            {this.createDropdown([{value: '0', text: 'Not likely'},
            {value: '1', text: 'If my doc says so'},
            {value: '2', text: 'I love second opinions'}], 9)}
        </div>
      </div>
      <div class='update-button-wrapper'>
        <button class='update-button'>UPDATE</button>
      </div>
    </div>
  )

  lifeQuestions = () => (
    <div>
      <p class='refine-title'>Great! We just need a litle more information from you</p>
      <div class='grid-wrapper'>
      {
        (this.props.userData.marriageStatus == 'married' || (this.props.userData.kidAges).length > 0)
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
        {this.props.userData.marriageStatus == 'married' && <Grid.Row>
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
            id='spouseAge'
            className='refine-input-grid'
            onChange={(e) => this.onInputChange('spouseAge', e)}
            value={this.props.userData.spouseAge}
            placeholder=''
          />
          </Grid.Column>
        </Grid.Row>}
        {this.generateChildRows(this.props.userData.kidAges)}
      </Grid>}
      </div>
      <div class='refine-question'>
        <p>What is the balance of your mortgage?</p>
        <div class='refine-input-currency-wrapper'>
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
      <div class='refine-question'>
        <p>What is the balance of your other debts?</p>
        <div class='refine-input-currency-wrapper'>
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
      <div class='refine-question'>
        <p>Do you have any existing life insurance (policy value)?</p>
        <div class='refine-input-currency-wrapper'>
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
      <div class='refine-question'>
        <p>What is the total current balance of your investments and savings?</p>
        <div class='refine-input-currency-wrapper'>
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
      <div class='update-button-wrapper'>
        <button class='update-button'>UPDATE</button>
      </div>
    </div>
  )

  disabilityQuestions = () =>{
    /* nothing */
  }

  render() {
    return (
      <div>
      {this.state.insuranceType == 'HEALTH' && this.healthQuestions()}
      {this.state.insuranceType == 'LIFE' && this.lifeQuestions()}
      </div>
    );
  }
}

export default RefineQuoteItem;
