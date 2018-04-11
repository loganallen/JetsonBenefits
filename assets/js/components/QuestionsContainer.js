/*
The [QuestionsContainer] component queries the database and serves the user a 
given set of quesions. Contains the [Sidebar] component.
This component is contained within the [Recommendation] component.

Model filepath:
Controller filepath:
*/

import React from 'react';
import {Header, List } from 'semantic-ui-react';

import Sidebar from './sub_components/Sidebar';

class QuestionsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    //currently hard coded but will pull question information from databse
    getQuestionInfo() {
    	return [
    		{text: "I'm {0} and I live in {1}", type: ["int","int"]},
    		{text: "I'm {0} with {1} kids", type: ["enum", "int"]},
    		{text: "My spouse is {0} years old and my kids are {1} and {2}", 
    			type: ["int","int","int"]},
    		{text: "I make ${0} per year and my spouse makes ${1}", type: ["int","int"]},
    		{text: "Generally, I would say my health is:", type: []}
    	]
    }

    //Format questions with html items inbetween 
    questionContent() {
    	return this.getQuestionInfo().map((item) => {
            return <List.Item key={item.text}>{item.text}</List.Item>
          })
    }

    render() {
    	const headerText = 'Let\'s find the best package for you. '+ 
    	 'Just tell us a bit about yourself.';
        return (
            <div id='homeS2'>
            	<Header> {headerText} </Header>
            	<div id='homeS2Content'>
            		<List>{this.questionContent()}</List>
            	</div>
            </div>
        );
    }
}

export default QuestionsContainer;
