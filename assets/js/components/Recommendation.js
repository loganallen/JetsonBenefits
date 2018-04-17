/*
[Recommendation] is the second main unique page, which contains the entire
recommendation engine and quote serving process. Serves the [QuestionsContainer]
and [QuotesContainer] components. Also contains the [Navigation] component.

Model filepath:
Controller filepath:
*/

import React from 'react';
import { connect } from 'react-redux';

import Actions from '../actions';
import QuestionsContainer from './QuestionsContainer';
import QuotesContainer from './QuotesContainer';
import Sidebar from './sub_components/Sidebar';
import '../../css/recommendation.css';

class Recommendation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 'questions', 
            age: this.props.age,
            zipcode: this.props.zipcode,
            marriage: '',
            kidages: '',
            spouseage: '',
            income: '',
            condition: ''
        };
    }

    componentWillMount() {
        this.props.changeMenuTheme('themeBlue');
    }

    //Returns basic quote information (from the model)
    // ***hard coded for now ***
    getInsuraceInfo = () => {
        return [{title: 'Basic Health', value: 0, active: true},
                {title: 'Term Life', value: 0, active: true},
                {title: 'Disability', value: 0, active: true},
                {title: 'Dental', value: 0, active: false},
                {title: 'Vision', value: 0, active: false},
                {title: 'Critical Illness', value: 0, active: false},]
    }

    mainContent = (stage) => {
        return (stage == 'questions') ? 
        <QuestionsContainer 
            className='questionsWrapper' 
            onPurchaseClick={this.onPurchaseClick}
            age={this.state.age}
            zipcode={this.state.zipcode}
            /> : <QuotesContainer />;
    }

    onPurchaseClick = (answers) => {
        this.setState({
            stage: 'quotes',
            age: answers.age,
            zipcode: answers.zipcode,
            marriage: answers.marriage,
            kidages: answers.kidages,
            spouseage: answers.spouseage,
            income: answers.income,
            condition: answers.condition
        });
    }

    render() {
        return (
            <div id='rec'>
                {(this.state.stage == 'questions') &&
                    <Sidebar
                    className='sidebar' 
                    id='sidebar' 
                    values={this.getInsuraceInfo()}/>}
                 {this.mainContent(this.state.stage)}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    age: state.app.age,
    zipcode: state.app.zipcode
});

const mapDispatchToProps = (dispatch) => ({
    changeMenuTheme: (theme) => dispatch(Actions.changeMenuTheme(theme))
  });

export default connect(mapStateToProps, mapDispatchToProps)(Recommendation);
