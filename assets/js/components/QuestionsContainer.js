/**
 * QuestionsContainer.js: This component renders the content for general user input questions.
 * It contains the [Sidebar.js] component on desktop renders, but on mobile interfaces
 * it exclusively renders the user input questions.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Menu } from 'semantic-ui-react';
import classNames from 'classnames';

import Sidebar from './sub_components/Sidebar';
import { HealthConditions, MaritalStatus, Gender, isEmpty } from '../utils';

// TODO: Dynamically save userData to the backend? So not just when clicking 'next'?

class QuestionsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Disable the Next/ShowQuotes button if required user inputs are left empty
  isButtonDisabled = (userData) => {
    var disabled = false;

    if (userData.marital_status === MaritalStatus.married) {
      if (isEmpty(userData.spouse_age) || isEmpty(userData.spouse_annual_income)) { disabled = true; }
    }
    if (userData.num_kids > 0) {
      let hasMissingAge = userData.kid_ages.reduce((acc, age) => acc || isEmpty(age), false);
      if (hasMissingAge) { disabled = true; }
    }
    disabled = Object.keys(userData).reduce((acc, key) => {
      if (['spouse_age', 'spouse_annual_income', 'kid_ages'].includes(key)) { return acc; }
      return acc || isEmpty(userData[key]);
    }, disabled);

    return disabled;
  }

  onInputChange = (key, event) => {
    // TODO: Validate inputs
    this.props.updateUserData(key, event.target.value);
  }

  onMaritalStatusChange = (value) => {
    this.props.updateUserData('marital_status', value);
  }

  onGenderChange = (value) => {
    this.props.updateUserData('gender', value);
  }

  onKidAgeChange = (idx, event) => {
    let age = event.target.value;
    this.props.updateUserData('kid_ages', { idx: idx, age: age });
  }

  onConditionItemClick = (event, { name }) => {
    this.props.updateUserData('health_condition', name);
  }

  ageInput = () => (
    <input
      type='text'
      className='questionsInput questionsInputShort'
      onChange={(e) => this.onInputChange('age', e)}
      value={this.props.userData.age}
      placeholder='30'
    />
  );

  zipcodeInput = () => (
    <input
      type='text'
      className='questionsInput questionsInputLong'
      onChange={(e) => this.onInputChange('zipcode', e)}
      value={this.props.userData.zipcode}
      placeholder='60601'
    />
  );

  genderDropdown = () => (
    <Dropdown
      id='questionsDropdown'
      className='questionsInput'
      options={[
        { value: Gender.male, text: 'Male', content: <span className='dropdownItem'>Male</span> },
        { value: Gender.female, text: 'Female', content: <span className='dropdownItem'>Female</span> },
        { value: Gender.none, text: 'Prefer not to say', content: <span className='dropdownItem'>Prefer not to say</span> },
      ]}
      onChange={(_, option) => this.onGenderChange(option.value)}
      value={this.props.userData.gender}
      placeholder='Gender'
    />
  );

  maritalStatusDropdown = () => (
    <Dropdown
      id='questionsDropdown'
      className='questionsInput'
      options={[
        { value: MaritalStatus.single, text: 'Single', content: <span className='dropdownItem'>Single</span> },
        { value: MaritalStatus.married, text: 'Married', content: <span className='dropdownItem'>Married</span> },
        { value: MaritalStatus.divorced, text: 'Divorced', content: <span className='dropdownItem'>Divorced</span> },
        { value: MaritalStatus.widowed, text: 'Widowed', content: <span className='dropdownItem'>Widowed</span> }
      ]}
      onChange={(_, option) => this.onMaritalStatusChange(option.value)}
      value={this.props.userData.marital_status}
      placeholder='Single'
    />
  );

  spouseAgeInput = () => (
    <input
      type='text'
      className='questionsInput questionsInputShort'
      onChange={(e) => this.onInputChange('spouse_age', e)}
      value={this.props.userData.spouse_age}
      placeholder='30'
    />
  );

  numKidsInput = () => (
    <input
      type='text'
      className='questionsInput questionsInputShort'
      onChange={(e) => this.onInputChange('num_kids', e)}
      value={this.props.userData.num_kids}
      placeholder='0'
    />
  );
    
  kidAgesInputs = () => {
    let inputs = [];
    for (let k=0; k<this.props.userData.num_kids; k++) {
      let value = this.props.userData.kid_ages[k];
      value = (value == undefined) ? '' : value;
      inputs.push(
        <input
          type='text'
          key={`kid${k+1}`}
          className='questionsInput questionsInputShort'
          onChange={(e) => this.onKidAgeChange(k, e)}
          value={value}
          placeholder='0'
        />
      );
      if (k < this.props.userData.num_kids-2) {
        inputs.push(<p key={`p${k+1}`}>, </p>);
      } else if (k == this.props.userData.num_kids-2) {
        inputs.push(<p key='and'>and</p>);
      }
    }

    return inputs;
  }

  incomeInput = () => (
    <input
      type='text'
      className='questionsInput questionsInputLong'
      onChange={(e) => this.onInputChange('annual_income', e)}
      value={this.props.userData.annual_income}
      placeholder='550000'
    />
  );

  spouseIncomeInput = () => (
    <input
      type='text'
      className='questionsInput questionsInputLong'
      onChange={(e) => this.onInputChange('spouse_annual_income', e)}
      value={this.props.userData.spouse_annual_income}
      placeholder='550000'
    />
  );

  healthConditionMenu() {
    let menuItems = HealthConditions.map(el => {
      let isActive = this.props.userData.health_condition === el;
      return (
        <Menu.Item
          key={el}
          name={el}
          className={classNames({
            'healthConditionMobileItem': this.props.isMobile
          })}
          color={isActive ? 'teal' : 'grey'}
          active={isActive}
          onClick={this.onConditionItemClick}
        >{el.charAt(0).toUpperCase() + el.substr(1)}</Menu.Item>
      );
    });

    return (
      <Menu
        id='healthConditionMenu'
        stackable
        compact
      >{menuItems}</Menu>
    );
  }

  // Main question page content
  questionContent() {
    return (
      <div id='questionsContent'>
        <p>I'm</p>
        {this.ageInput()}
        <p>years old and I live in</p>
        {this.zipcodeInput()}
        <p>.</p>
        <br/>
        <p>I identify as a</p>
        {this.genderDropdown()}
        <p>.</p>
        <br/>
        <p>I'm</p>
        {this.maritalStatusDropdown()}
        <p>with</p>
        {this.numKidsInput()}
        <p>kids.</p>
        {this.props.userData.marital_status === MaritalStatus.married && (
          <div>
            <p>My spouse is </p>
            {this.spouseAgeInput()}
            <p>years old.</p>
          </div>
        )}
        {this.props.userData.num_kids > 0 && (
          <div>
            <p>and my kids are </p>
            {this.kidAgesInputs()}
            <p>years old.</p>
          </div>
        )}
        <br/>
        <p>I make $</p>
        {this.incomeInput()}
        <p>per year.</p>
        {this.props.userData.marital_status === MaritalStatus.married && (
          <div>
            <p>My spouse makes $</p>
              {this.spouseIncomeInput()}
            <p>per year.</p>
          </div>
        )}
        <br/>
        <p>Generally I would say my health is</p><br/>
        {this.healthConditionMenu()}
        <br/>
      </div>
    );
  }

  render() {
    const headerText = 'Let\'s find the best package for you. '+ 
      'Just tell us a bit about yourself.';
      
    return (
        <div id="questionsWrapper">
          <h1 id="questionsHeader">{headerText}</h1>
          {this.questionContent()} 
          <button
            id='nextButton'
            className={classNames({ disabled: this.isButtonDisabled(this.props.userData) })}
            onClick={this.props.onNextClick}
            disabled={this.isButtonDisabled(this.props.userData)}
          >{(this.props.isMobile) ? 'Next' : 'Show Quotes'}
          </button>
        </div>
    );
  }
}

export default QuestionsContainer;
