/*
[Recommendation] is the second main unique page, which contains the entire
recommendation engine and quote serving process. Serves the [QuestionsContainer]
and [QuotesContainer] components. Also contains the [Navigation] component.

Model filepath:
Controller filepath:
*/

import React from 'react';
import { connect } from 'react-redux';

import QuestionsContainer from './QuestionsContainer';
import Sidebar from './sub_components/Sidebar';
import QuotesContainer from './QuotesContainer';

import Actions from '../actions';
import { isMobile } from '../utils';
import '../../css/recommendation.css';

/**
 * this.state.stage: ['questions', 'recommendation', 'quotes']
 */

class Recommendation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 'questions',
            isMobile: isMobile(this.props.deviceWidth)
        };
    }

    componentWillMount() {
        this.props.changeMenuTheme('themeBlue');
        // TODO: Remove this action and put menu inside Recommendation component
    }

    onMobileNextClick = () => {
        this.setState({
            stage: 'recommendation'
        });
    }

    onShowQuotesClick = () => {
        this.setState({
            stage: 'quotes'
        });
    }

    questionsContent() {
        return (
            <div>
                {(!this.state.isMobile) && <Sidebar/>}
                <QuestionsContainer
                    onNextClick={(this.state.isMobile) ? this.onMobileNextClick : this.onShowQuotesClick}
                    userData={this.props.userData}
                    updateUserData={this.props.updateUserData}
                    isMobile={this.state.isMobile}
                />
            </div>
        );
    }

    // Exclusively for mobile -- the stage in between the questions & quotes page
    recommendationContent() {
        return (
            <Sidebar
                isMobile={this.state.isMobile}
                onNextClick={this.onShowQuotesClick}
            />
        );
    }

    quotesContent() {
        return (
            <QuotesContainer
                userData={this.props.userData}
                updateUserData={this.props.updateUserData}
                isMobile={this.state.isMobile}
            />
        );
    }

    render() {
        let renderedContent = (stage => {
            switch (stage) {
                case 'questions':
                    return this.questionsContent();
                case 'recommendation':
                    return this.recommendationContent();
                case 'quotes':
                    return this.quotesContent();
                default:
                    return this.questionsContent();
            }
        })(this.state.stage);

        return (
            <div id='rec'>
                {renderedContent}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userData: state.app.userData,
    deviceWidth: state.app.deviceWidth
});

const mapDispatchToProps = (dispatch) => ({
    changeMenuTheme: (theme) => dispatch(Actions.changeMenuTheme(theme)),
    updateUserData: (key, value) => dispatch(Actions.updateUserData(key, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recommendation);
