/*
The [QuestionsContainer] component queries the database and serves the user a 
given set of quesions. Contains the [Sidebar] component.
This component is contained within the [Recommendation] component.
*/

import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Menu } from 'semantic-ui-react';
import classNames from 'classnames';

import Sidebar from './sub_components/Sidebar';

class QuestionsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    isButtonDisabled = () => {
      var disabled = false;
      Object.keys(this.props.userData).forEach(key => {
        if (key === 'spouse_age' && this.props.userData['marital_status'] === 'single') return;
        else if (key === 'kid_ages' && this.props.userData['num_kids'] == 0) return;
        else if (key === 'num_kids' && this.props.userData[key] !== '') return;
        disabled = this.props.userData[key] == false || disabled;
      });

      return disabled;
    }

    onInputChange = (key, event) => {
      // TODO: Validate inputs
      this.props.updateUserData(key, event.target.value);
    }

    onDropdownChange = (value) => {
      this.props.updateUserData('marital_status', value);
    }

    onKidAgeChange = (idx, event) => {
      let age = event.target.value;
      this.props.updateUserData('kidAges', { idx: idx, age: age });
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

    maritalStatusDropdown = () => (
      <Dropdown
        id='questionsDropdown'
        className='questionsInput'
        options={[
          { value: 'single', text: 'Single', content: <span className='dropdownItem'>Single</span> },
          { value: 'married', text: 'Married', content: <span className='dropdownItem'>Married</span> },
          { value: 'divorced', text: 'Divorced', content: <span className='dropdownItem'>Divorced</span> },
          { value: 'widowed', text: 'Widowed', content: <span className='dropdownItem'>Widowed</span> }
        ]}
        onChange={(_, option) => this.onDropdownChange(option.value)}
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
        inputs.push(
          <input
            type='text'
            key={`kid${k+1}`}
            className='questionsInput questionsInputShort'
            onChange={(e) => this.onKidAgeChange(k, e)}
            value={this.props.userData.kid_ages[k]}
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
      let conditions = ['poor', 'meh', 'good', 'excellent'];
      let menuItems = conditions.map(el => {
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

    //Main question page content
    questionContent() {
    	return (
        <div id='questionsContent'>
          <p>I'm</p>
          {this.ageInput()}
          <p>years old and I live in</p>
          {this.zipcodeInput()}
          <p>.</p>
          <br/>
          <p>I'm</p>
          {this.maritalStatusDropdown()}
          <p>with</p>
          {this.numKidsInput()}
          <p>kids.</p>
          {this.props.userData.marital_status == 'married' && (
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
          {this.props.userData.marital_status == 'married' && (
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
              onClick={this.props.onNextClick}
              // disabled={this.isButtonDisabled()}
            >{(this.props.isMobile) ? 'Next' : 'Show Quotes'}
            </button>
          </div>
      );
    }
}

export default QuestionsContainer;
