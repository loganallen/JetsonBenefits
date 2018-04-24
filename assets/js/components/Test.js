/*
Use this [Test] component to easily test API calls. Change {testFunc} to 
take the proper arguments for whichever action you want to test. Look at
'/js/actions/index.js' for the API functions. The output will be logged to
the console. You must be an authenticated user to test the API calls (i.e. logged in)
*/

import React from 'react';
import { connect } from 'react-redux';

import Actions from '../actions';
import Auth from '../auth';

class Test extends React.Component {
  handleAPIclick = () => {
    let authToken = Auth.authToken();

    // Pass in the correct function arguments here
    this.props.testFunc(
      authToken,
      { age: 27, zipcode: '14850' }
    );
  }

  render() {
    return (
      <div>
        <h1>API Test Componenet</h1>
        <button onClick={this.handleAPIclick}>Make API Call</button>
        <br/><br/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // Choose which API function to test here
  testFunc: (token, data) => dispatch(Actions.postUserInfo(token, data))
});

export default connect(state => state.app, mapDispatchToProps)(Test);
