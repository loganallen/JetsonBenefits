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
import Menu from './Menu';
import { isMobile } from '../utils';
import { isLoggedIn, authToken } from '../auth';

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
        if (isLoggedIn()) {
            this.props.loadUserData(authToken());
        } else {
            // Grab from localStorage to update redux store with cached data
            // let userData = localStrorage.getItem("userData");
            // if (userData) {
            //   this.props.updateBulkUserData(JSON.parse(userData));
            // }
        }
    }

    componentWillUnmount() {
        // if (!isLoggedIn()) {
        //   localStorage.setItem(JSON.stringify(this.props.userData));
        // }
    }

    onMobileNextClick = () => {
        this.setState({
            stage: 'recommendation'
        });
    }

    updateStage = (stage) => {
        this.setState(
            { stage: stage }
        )
    }

    onShowQuotesClick = () => {
        if (isLoggedIn()) {
            // Save userData to the backend
            this.props.saveUserData(authToken());
        }
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
                    updateBulkUserData={this.props.updateBulkUserData}
                    isMobile={this.state.isMobile}
                    updateStage={this.updateStage}
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
                updateStage={this.updateStage}
            />
        );
    }

    quotesContent() {
        return (
            <QuotesContainer
                isMobile={this.state.isMobile}
                updateStage={this.updateStage}
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
            <div>
                <Menu history={this.props.history} />
                <div id='rec'>
                    {renderedContent}
                </div>
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
    updateUserData: (key, value) => dispatch(Actions.updateUserData(key, value)),
    updateBulkUserData: (data) => dispatch(Actions.updateBulkUserData(data)),
    saveUserData: (token) => dispatch(Actions.postUserInfo(token)),
    loadUserData: (token) => dispatch(Actions.fetchUserInfo(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recommendation);
