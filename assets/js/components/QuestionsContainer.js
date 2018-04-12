/*
The [QuestionsContainer] component queries the database and serves the user a 
given set of quesions. Contains the [Sidebar] component.
This component is contained within the [Recommendation] component.

Model filepath:
Controller filepath:
*/

import React from 'react';
import { connect } from 'react-redux';
import {Header, List , Dropdown} from 'semantic-ui-react';

import Sidebar from './sub_components/Sidebar';

class QuestionsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
      		age: '',
      		zipcode: '',
      		marriage: '',
      		kidages: '',
      		spouseage: '',
      		income: ''
    	};
    }

    //Main question page content
    questionContent() {
    	return (
      <div id='questions'>
        <div id='questionsContent'>
          <p>I'm</p>
          <input
            type='text'
            id='questionsInput1'
            className='questionsInput'
            onChange={(e) => this.onInputChange('age', e)}
            placeholder='30'
          />
          <p>years old and I live in</p>
          <input
            type='text'
            id='questionsInput2'
            className='questionsInput'
            onChange={(e) => this.onInputChange('zip', e)}
            placeholder='60601'
          />
          <p>.</p>
          <br/>
          <p>I'm</p>
          <Dropdown
            id='questionsDropdown'
            className='questionsInput'
            icon={null}
            onChange={(e) => this.onInputChange('marriage', e)}
            placeholder='Single'
            options={[
 				{ value: 'single', text: 'Single' },
  				{ value: 'married', text: 'Married' },
			]}
          />
          <p>with</p>
          <input
            type='text'
            id='questionsInput1'
            className='questionsInput'
            onChange={(e) => this.onInputChange('kids', e)}
            placeholder='0'
          />
          <p>kids</p>
          <p>.</p>
          <br/>
          <p>My spouse is </p>
          <input
            type='text'
            id='questionsInput1'
            className='questionsInput'
            onChange={(e) => this.onInputChange('spouseage', e)}
            placeholder='0'
          />
      {/*this should only show up if they have kids*/}
          <p>years old and my kids are </p>
          <input
            type='text'
            id='questionsInput1'
            className='questionsInput'
            onChange={(e) => this.onInputChange('kidages', e)}
            placeholder='0'
          />
          <p>.</p>
          <br/>
          <p>I make $</p>
          <input
            type='text'
            id='questionsInput2'
            className='questionsInput'
            onChange={(e) => this.onInputChange('income', e)}
            placeholder='550000'
          />
          <p>per year.</p>
          <br/>
          {/*optional question about spouse income*/}
          <p>Generally I would say my health is</p>
          {/*4 option thing*/}

          <br/>
        </div>
      </div>
    );
    }

    render() {
    	const headerText = 'Let\'s find the best package for you. '+ 
    	 'Just tell us a bit about yourself.';
        return (
            <div>
            	<Header> {headerText} </Header>
            	{this.questionContent()} 
            	<button 
            		id='quotesButton' 
            		className='quotesButton'
            		onClick={() => this.props.onPurchaseClick(this.state)}>
            		Show Quotes
            	</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsContainer);
