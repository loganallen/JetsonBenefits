import React from 'react';
import { Grid, Button, Dropdown } from 'semantic-ui-react';

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
      this.props.updateUserData('dropdown'+id, value);
    }

  createDropdown = (answers, id) => (
      <Dropdown
        id={`dropdown${id}`}
        className={'questionDropdown'}
        key={`dropdown${id}`}
        options={answers}
        value={this.props.userData[`dropdown${id}`]}
        onChange={(_, option, id) => this.onDropdownChange(option.value, id)}
      />
    );

  generateChildRows = (kidAges) => {
    return kidAges.map((age, idx) => {
      return (
      <Grid.Row key={'row'+idx}>
          <Grid.Column>
          {'Child ' + idx}
          </Grid.Column>
          <Grid.Column>
          <input
            type='text'
            id={'kidName'+ idx}
            className='kidName'
            placeholder={''}
          />
          </Grid.Column>
          <Grid.Column>
          <input
            type='text'
            id={'kidAge'+ idx}
            className='kidAge'
            onChange={(e) => this.onKidAgeChange(idx,event)}
            value={age}
            placeholder={''}
          />
          </Grid.Column>
          <Grid.Column>
            <Button key={'button' + idx}>
            O 
            </Button>
          </Grid.Column>
        </Grid.Row>)
      })
  }

  healthQuestions = () => (
    <div>
    <div>
      <p>Great! We just need a litle more information from you</p>
    </div>
    <div>
    <p>Do you take prescription medications</p>
    {this.createDropdown([
      {value: 'yes', text: 'yes'},
      {value: 'no', text: 'no'}], 0)}<br/>
    <p>Do you have a chronic condition</p>
    {this.createDropdown([
      {value: 'yes', text: 'yes'},
      {value: 'no', text: 'no'}], 1)}<br/>
    <p>How likely are you to visit your doctor for your annual physical exam</p>
    {this.createDropdown([
      {value: '2', text: 'likely'},
      {value: '1', text: 'somewhat likely'},
      {value: '0', text: 'not likely'}], 2)}<br/>
    <p>How many times do you visit your doctor each year</p>
    <input
        type='text'
        id='doctorVisit'
        className='doctorVisit'
        onChange={(e) => this.onInputChange('doctorVisit', e)}
        value={this.props.userData.doctorVisit}
        placeholder='1'
      /><br/>
    <p>There's a cold going around and the office and you wake up with a sore throat. What do you do?</p> 
    {this.createDropdown([{value: '0', text: 'Drink some tea, it\'ll pass'},
       {value: '1', text: 'If I don\'t feel better in a few days, I\'m going to the doctor'}, 
       {value: '2', text: 'Go to the doctor immediately'}], 4)}<br/>
    <p>Your doctor asks you to come back for additional tests after your physical exam. What do you do?</p>
      {this.createDropdown([{value: '0', text: 'Do nothing, I feel fine'},
       {value: '1', text: 'Find out cost before booking appointment'},
       {value: '2', text: 'Schedule right away'}], 5)}<br/>
    <p>How much do you worry about being diagnosed with a serious medical condition and having huge medical expenses?</p>
      {this.createDropdown([{value: '0', text: 'Not a lot'},
       {value: '1', text: 'It crosses my mind sometimes'},
       {value: '2', text: 'Huge worry'}], 6)}<br/>
    <p>How much do you worry about the medical expenses associated with a serious accident?</p>
      {this.createDropdown([{value: '0', text: 'Not a lot'},
       {value: '1', text: 'It crosses my mind sometimes'},
       {value: '2', text: 'Huge worry'}], 7)}<br/>
    <p>How do you schedule your doctor's appointments?</p>
      {this.createDropdown([{value: '0', text: 'I don\'t ...'},
       {value: '1', text: 'Conveinent time with any doctor'},
       {value: '2', text: 'I must see my doc'}], 8)}<br/>
    <p>How likely are you to seek out advice from a specialist?</p>
      {this.createDropdown([{value: '0', text: 'Not likely'},
       {value: '1', text: 'If my doc says so'},
       {value: '2', text: 'I love second opinions'}], 9)}
    </div>
    </div>
  )

  lifeQuestions = () => (
    <div>
      <p>Great! We just need a litle more information from you</p>
      {
        (this.props.userData.marriageStatus == 'married' || (this.props.userData.kidAges).length > 0)
        && <Grid columns={4}>
        <Grid.Row>
          <Grid.Column>
          {/*the first column has a blank header*/}
          </Grid.Column>
          <Grid.Column>
          Name
          </Grid.Column>
          <Grid.Column>
          Age
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
            className='spouseName'
            onChange={(e) => this.onInputChange('spouseName', e)}
            placeholder=''
          />
          </Grid.Column>
          <Grid.Column>
          <input
            type='text'
            id='spouseAge'
            className='spouseAge'
            onChange={(e) => this.onInputChange('spouseAge', e)}
            placeholder=''
          />
          </Grid.Column>
        </Grid.Row>}
        {this.generateChildRows(this.props.userData.kidAges)}
      </Grid>}
      <div>
        <p>What is the balance of your mortgage?</p>
        <input
          type='text'
          id='mortgageInput'
          className='mortgageInput'
          onChange={(e) => this.onInputChange('mortgageBalance', e)}
          placeholder='100,000'
        />
      </div>
      <div>
        <p>What is the balance of your other debts?</p>
        <input
          type='text'
          id='debtTotal'
          className='debtTotal'
          onChange={(e) => this.onInputChange('debtTotal', e)}
          placeholder='250,000'
        />
      </div>
      <div>
        <p>Do you have any existing life insurance (polciy value)?</p>
        <input
           type='text'
           id='existingLifeInsurance'
           className='existingLifeInsurance'
           onChange={(e) => this.onInputChange('existingLifeInsurance', e)}
           placeholder='1,000,000'
          />
      </div>
      <div>
        <p>What is the total current balance of your investments and savings?</p>
        <input
           type='text'
           id='investments'
           className='investments'
           onChange={(e) => this.onInputChange('investments', e)}
           placeholder='60,000'
          />
      </div>  
    </div>
    /*
    child, name, age, pay for college
    
    What is the balance of your other debts
    Do you have any existing life insurance (polciy value)
    What is the total current balance of your investments and savings
    */
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
