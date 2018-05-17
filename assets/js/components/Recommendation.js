/**
 * Recommendation.js: This page contains the user input pages, the recommendation engine, and quote
 * serving process. It renders the [QuestionsContainer.js] and [QuotesContainer.js] components
 * conditionally. On mobile interfaces it renders the [Sidebar.js] as the intermedaite page
 * between the aforementioned components. It also contains the [Menu.js] component. It is the
 * delegate for transitioning between the stages of the recommendation flow.
 */

import React from 'react';
import { connect } from 'react-redux';

import QuestionsContainer from './QuestionsContainer';
import Sidebar from './sub_components/Sidebar';
import QuotesContainer from './QuotesContainer';

import Actions from '../actions';
import Menu from './Menu';
import { isMobile, RecommendationStages } from '../utils';
import { isAuthenticated } from '../auth';

import '../../css/recommendation.css';

class Recommendation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: RecommendationStages.questions,
      isMobile: isMobile(this.props.deviceWidth)
    };
  }

  componentWillMount() {
    this.props.changeMenuTheme('themeBlue');
    if (isAuthenticated()) {
      this.props.loadUserData();
    } else {
      // TODO: Grab cached app state from localStorage to update redux store. Can apply to [Recommendation.js] as well
      // let userData = localStrorage.getItem('userData');
      // if (userData) {
      //   this.props.updateBulkUserData(JSON.parse(userData));
      // }
    }
  }

  componentWillUnmount() {
    // TODO: Cache local app state before a page refresh
    // if (!isAuthenticated()) {
    //   localStorage.setItem('userData', JSON.stringify(this.props.userData));
    // }
  }

  onMobileNextClick = () => {
    this.updateStage(RecommendationStages.recommendation);
  }

  updateStage = (newStage) => {
    this.setState({ 
      stage: newStage
    });
  }

  onShowQuotesClick = () => {
    if (isAuthenticated()) {
      // Save userData to the backend
      this.props.saveUserData();
    }
    this.updateStage(RecommendationStages.quotes);
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

    // Exclusively for mobile -- the stage inbetween the questions & quotes page
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
        case RecommendationStages.questions:
          return this.questionsContent();
        case RecommendationStages.recommendation:
          return this.recommendationContent();
        case RecommendationStages.quotes:
          return this.quotesContent();
        default:
          return this.questionsContent();
      }
    })(this.state.stage);
    
    return (
      <div>
        <Menu history={this.props.history} />
        <div className='container' id='rec'>
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
  saveUserData: () => dispatch(Actions.postUserInfo()),
  loadUserData: () => dispatch(Actions.fetchUserInfo())
});

export default connect(mapStateToProps, mapDispatchToProps)(Recommendation);
