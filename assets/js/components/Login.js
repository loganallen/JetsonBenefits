/*
The [Login] component is a modal which prompts the user to either enter their
login information or create an account on the spot.

Model filepath:
Controller filepath:
*/

import React from 'react';
import {Modal, Button} from 'semantic-ui-react';

import {connect} from 'react-redux';

import Actions from '../actions';
import Auth from '../auth';

class Login extends React.Component {
  
  constructor(props) {
    super(props);
  
    if (Auth.loggedIn()) {
      this.thing();
    }
  }

  login = () => {
    const [ username, password ] = [ $('#login-email').val(), $('#login-password').val() ];

    console.log(this);

    const cb = (res) => {
      console.log(res);
      
      if (res.success) {
        this.props.updateLoginModal(false, true);
      } else {
        // display error message res.error
      }
    };

    Auth.login(username, password, cb);
  }

  signup = () => {
    const userData = {
      firstName: $('#signup-firstName').val(),
      lastName: $('#signup-lastName').val(),
      email: $('#signup-email').val(),
      password: $('#signup-password').val()
    };

    const cb = (res) => {
      console.log(res);

      if (res.success) {
        this.props.updateLoginModal(false, true);
      } else {
        // display error message res.error
      }
    }

    Auth.signup(userData, cb);
  }

  render() {
    const header = this.props.isLogin ? (
      <div className="loginHeaderWrapper">
        <h1 className="loginHeader">Sign In</h1>
      </div>
    ) : (
      <div className="loginHeaderWrapper">
        <h1 className="loginHeader">Create an Account</h1>
        <p className="loginSubheader">Get started finding your personalized benefits package today.</p>
      </div>
    );

    const content = this.props.isLogin ? (
      <div>
        <input id="login-email" name="login-email" className="modalInput" type="email" placeholder="email"/>
        <input id="login-password" name="login-password" className="modalInput" type="password" placeholder="password"/>
        <button id="login" name="login" className="modalButton" onClick={this.login}>
          Sign in
         </button> 
        <p className="modalFooter">Dont have an account yet? <button className='typeSwitcher' onClick={() => this.props.updateLoginModal(true, false)}>Sign Up</button></p>
      </div>
    ) : (
      <div>
        <input id="signup-firstName" name="signup-firstName" className="modalInput_half left" type="text" placeholder="first name"/>
        <input id="signup-lastName" name="signup-lastName" className="modalInput_half right" type="text" placeholder="last name"/>
        <input id="signup-email" name="signup-email" className="modalInput" type="email" placeholder="email"/>
        <input id="signup-password" name="signup-password" className="modalInput" type="password" placeholder="password"/>
        <button id="signup" name="signup" className="modalButton" onClick={this.signup}>
          Sign up
         </button> 
        <p className="modalFooter">Already have an account? <button className='typeSwitcher' onClick={() => this.props.updateLoginModal(true, true)}>Login</button></p>
      </div>
    );

    return (
      <div>
        <Modal size={'large'} open={this.props.isOpen} onClose={this.props.onClose}>
          <div id="modalWrapper">
            <div id="modalImg">
              <h1>jetsonbenefits</h1>
            </div>
            <div id="modalContent">
              { header }
              { content }
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.app
});

const mapDispatchToProps = (dispatch) => ({
  updateLoginModal: (isOpen, isLogin) => dispatch(Actions.updateLoginModal(isOpen, isLogin))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
