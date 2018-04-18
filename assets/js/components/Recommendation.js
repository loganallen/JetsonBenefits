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
            stage: 'questions'
        };
        console.log('rec', props);
    }

    componentWillMount() {
        this.props.changeMenuTheme('themeBlue');
    }

    //Returns basic quote information (from the model)
    // ***hard coded for now ***
    getInsuraceInfo = () => {
        return [
            {title: 'Basic Health', value: 0, active: true},
            {title: 'Term Life', value: 0, active: true},
            {title: 'Disability', value: 0, active: true},
            {title: 'Dental', value: 0, active: false},
            {title: 'Vision', value: 0, active: false},
            {title: 'Critical Illness', value: 0, active: false}
        ];
    }

    onShowQuotes = () => {
        this.setState({
            stage: 'quotes'
        });
    }

    mainContent(stage) {
        return (stage == 'questions') ?
            <QuestionsContainer
                className='questionsWrapper'
                onShowQuotes={this.onShowQuotes}
                userData={this.props.userData}
                updateUserData={this.props.updateUserData}
            /> : 
            <QuotesContainer 
                userData={this.props.userData}
                updateUserData={this.props.updateUserData}
            />;
    }

    render() {
        console.log(this.props.userData);
        return (
            <div id='rec'>
                {(this.state.stage == 'questions') &&
                    <Sidebar
                        className='sidebar' 
                        id='sidebar' 
                        values={this.getInsuraceInfo()}
                    />}
                {this.mainContent(this.state.stage)}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userData: state.app.userData
});

const mapDispatchToProps = (dispatch) => ({
    changeMenuTheme: (theme) => dispatch(Actions.changeMenuTheme(theme)),
    updateUserData: (key, value) => dispatch(Actions.updateUserData(key, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recommendation);
