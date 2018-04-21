/*
The [QuestionsContainer] component queries the database and serves the user a 
given set of quesions. Contains the [Sidebar] component.
This component is contained within the [Recommendation] component.
*/

import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Menu } from 'semantic-ui-react';

import Sidebar from './sub_components/Sidebar';

class QuestionsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onInputChange = (key, event) => {
      // TODO: Validate inputs
      this.props.updateUserData(key, event.target.value);
    }

    onDropdownChange = (value) => {
      this.props.updateUserData('marriageStatus', value);
    }

    onKidAgeChange = (idx, event) => {
      let age = event.target.value;
      this.props.updateUserData('kidAges', { idx: idx, age: age });
    }

    onConditionItemClick = (event, { name }) => {
      this.props.updateUserData('healthCondition', name);
    }

    ageInput = () => (
      <input
        type='text'
        id='questionsInput1'
        className='questionsInput'
        onChange={(e) => this.onInputChange('age', e)}
        value={this.props.userData.age}
        placeholder='30'
      />
    );

    zipcodeInput = () => (
      <input
        type='text'
        id='questionsInput2'
        className='questionsInput'
        onChange={(e) => this.onInputChange('zipcode', e)}
        value={this.props.userData.zipcode}
        placeholder='60601'
      />
    );

    marriageStatusDropdown = () => (
      <Dropdown
        id='questionsDropdown'
        className='questionsInput'
        options={[
          { value: 'single', text: 'Single' },
          { value: 'married', text: 'Married' },
        ]}
        onChange={(_, option) => this.onDropdownChange(option.value)}
        value={this.props.userData.marriageStatus}
        placeholder='Single'
      />
    );

    spouseAgeInput = () => (
      <input
        type='text'
        id='questionsInput1'
        className='questionsInput'
        onChange={(e) => this.onInputChange('spouseAge', e)}
        value={this.props.userData.spouseAge}
        placeholder='30'
      />
    );

    numKidsInput = () => (
      <input
        type='text'
        id='questionsInput1'
        className='questionsInput'
        onChange={(e) => this.onInputChange('numKids', e)}
        value={this.props.userData.numKids}
        placeholder='0'
      />
    );
    
    kidAgesInputs = () => {
      let inputs = [];
      for (let k=0; k<this.props.userData.numKids; k++) {
        inputs.push(
          <input
            type='text'
            id='questionsInput1'
            key={`kid${k+1}`}
            className='questionsInput'
            onChange={(e) => this.onKidAgeChange(k, e)}
            value={this.props.userData.kidAges[k]}
            placeholder='0'
          />
        );
        if (k < this.props.userData.numKids-2) {
          inputs.push(<p key={`p${k+1}`}>, </p>);
        } else if (k == this.props.userData.numKids-2) {
          inputs.push(<p key='and'>and</p>);
        }
      }

      return inputs;
    }

    incomeInput = () => (
      <input
        type='text'
        id='questionsInput2'
        className='questionsInput'
        onChange={(e) => this.onInputChange('income', e)}
        value={this.props.userData.income}
        placeholder='550000'
      />
    );

    healthConditionMenu() {
      let options = ['Poor', 'Meh', 'Good', 'Excellent'];
      let menuItems = options.map(el => {
        let isActive = this.props.userData.healthCondition === el.toLowerCase();
        return (
          <Menu.Item
            key={el.toLowerCase()}
            name={el.toLowerCase()}
            color={isActive ? 'teal' : 'grey'}
            active={isActive}
            onClick={this.onConditionItemClick}
          >{el}</Menu.Item>
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
      <div id='questions'>
        <div id='questionsContent'>
          <p>I'm</p>
          {this.ageInput()}
          <p>years old and I live in</p>
          {this.zipcodeInput()}
          <p>.</p>
          <br/>
          <p>I'm</p>
          {this.marriageStatusDropdown()}
          <p>with</p>
          {this.numKidsInput()}
          <p>kids.</p>
          {this.props.userData.marriageStatus == 'married' && (
            <div>
              <p>My spouse is </p>
              {this.spouseAgeInput()}
              <p>years old.</p>
            </div>
          )}
          {this.props.userData.numKids > 0 && (
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
          <br/>
          <p>Generally I would say my health is</p><br/>
          {this.healthConditionMenu()}
          <br/>
        </div>
      </div>
    );
    }

    render() {
    	const headerText = 'Let\'s find the best package for you. '+ 
    	 'Just tell us a bit about yourself.';
      return (
          <div id="questions-container">
            <h1 id="header-h1">{headerText}</h1>
            {this.questionContent()} 
            <button 
              id='quotesButton' 
              className='quotesButton'
              onClick={this.props.onShowQuotes}
            >Show Quotes
            </button>
          </div>
      );
    }
}

const mapStateToProps = (state) => ({
  userData: state.app.userData
});

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, null)(QuestionsContainer);
