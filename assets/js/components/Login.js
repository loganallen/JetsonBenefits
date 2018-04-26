/*
The [Login] component is a modal which prompts the user to either enter their
login information or create an account on the spot.

Model filepath:
Controller filepath:
*/

import React from 'react';
import {Modal, Button, Icon} from 'semantic-ui-react';
import classNames from 'classnames';

import {connect} from 'react-redux';

import Actions from '../actions';
import { isMobile } from '../utils';

import '../../css/login.css';

class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.state =  {
      isMobile: isMobile(this.props.deviceWidth), 
      loginEmail: '',
      loginPassword: '',
      signupFirstName: '',
      signupLastName: '',
      signupEmail: '',
      signupPassword: ''
    };
  }

  onLoginClick = () => {
  if (this.state.loginEmail.length > 0 && this.state.loginPassword.length > 0) {
      this.props.onLogin(this.state.loginEmail, this.state.loginPassword);
    }
  }

  onSignupClick = () => {
    const userData = {
      firstName: this.state.signupFirstName,
      lastName: this.state.signupLastName,
      email: this.state.signupEmail,
      password: this.state.signupPassword
    }

    let valid = Object.values(userData).reduce((acc, val) => acc && val.length > 0, true); // TODO
   
    if (valid) {
      this.props.onSignup(userData);
    }
  }

  /**
   * Creates a handler that updates the state for the login & sign up modal
   * @param {Object} event: js event
   */
  handleInputChange = event => {
    this.state[event.target.name] = event.target.value;
    this.setState(this.state);
  }

  desktopRender = () => {
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
        <input 
          name="loginEmail"
          value={this.state.loginEmail}
          className="modalInput" 
          type="email"
          placeholder="email"
          onChange={this.handleInputChange} 
        />
        <input
          name="loginPassword"
          value={this.state.loginPassword}
          className="modalInput"
          type="password"
          placeholder="password"
          onChange={this.handleInputChange}
        />
        <button id="login" name="login" className="modalButton" onClick={this.onLoginClick}>
          Sign in
        </button> 
        <p className="modalFooter">
          Dont have an account yet?
          <button className='typeSwitcher' onClick={() => this.props.updateLoginModal(true, false)}>
            Sign Up
          </button>
        </p>
      </div>
    ) : (
      <div>
        <input
          name="signupFirstName"
          value={this.state.signupFirstName}
          className="modalInput_half left"
          type="text"
          placeholder="first name"
          onChange={this.handleInputChange}
        />
        <input
          name="signupLastName"
          value={this.state.signupLastName}
          className="modalInput_half right"
          type="text"
          placeholder="last name"
          onChange={this.handleInputChange}
        />
        <input
          name="signupEmail"
          value={this.state.signupEmail}
          className="modalInput"
          type="email"
          placeholder="email"
          onChange={this.handleInputChange}
        />
        <input
          name="signupPassword"
          value={this.state.signupPassword}
          className="modalInput"
          type="password"
          placeholder="password"
          onChange={this.handleInputChange}
        />
        <button id="signup" name="signup" className="modalButton" onClick={this.onSignupClick}>
          Sign up
         </button> 
        <p className="modalFooter">Already have an account?
          <button className='typeSwitcher' onClick={() => this.props.updateLoginModal(true, true)}>
            Login
          </button>
        </p>
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
  };

  mobileRender = () => {
    const content = this.props.isLogin ? (
      <div>
        <input 
          name="loginEmail"
          value={this.state.loginEmail}
          className="modalInput" 
          type="email"
          placeholder="email"
          onChange={this.handleInputChange} 
        />
        <input
          name="loginPassword"
          value={this.state.loginPassword}
          className="modalInput"
          type="password"
          placeholder="password"
          onChange={this.handleInputChange}
        />
        <button id="login" name="login" className="modalButton" onClick={this.onLoginClick}>
          Sign in
        </button> 
        <p className="modalFooter">
          Dont have an account yet?
          <button className='typeSwitcher' onClick={() => this.props.updateLoginModal(true, false)}>
            Sign Up
          </button>
        </p>
      </div>
    ) : (
      <div>
        <input
          name="signupFirstName"
          value={this.state.signupFirstName}
          className="modalInput"
          type="text"
          placeholder="first name"
          onChange={this.handleInputChange}
        />
        <input
          name="signupLastName"
          value={this.state.signupLastName}
          className="modalInput"
          type="text"
          placeholder="last name"
          onChange={this.handleInputChange}
        />
        <input
          name="signupEmail"
          value={this.state.signupEmail}
          className="modalInput"
          type="email"
          placeholder="email"
          onChange={this.handleInputChange}
        />
        <input
          name="signupPassword"
          value={this.state.signupPassword}
          className="modalInput"
          type="password"
          placeholder="password"
          onChange={this.handleInputChange}
        />
        <button id="signup" name="signup" className="modalButton" onClick={this.onSignupClick}>
          Sign up
         </button> 
        <p className="modalFooter">Already have an account?
          <button className='typeSwitcher' onClick={() => this.props.updateLoginModal(true, true)}>
            Login
          </button>
        </p>
      </div>
    );

    return (
      <div id='modalWrapperMobile' className={classNames({ hidden: !this.props.isOpen })}>
        <button id="mobileModalClose" onClick={this.props.onClose}><Icon name='close' size='huge' color='red' /></button>
        <div id="modalImg">
          <h1>jetsonbenefits</h1>
        </div>
        <div id="modalContent">
          { content }
        </div>
      </div>
    );
  }

  render() {
    return this.state.isMobile ? this.mobileRender() : this.desktopRender();
  }
}

const mapStateToProps = (state) => ({
  ...state,
  deviceWidth: state.app.deviceWidth
});

const mapDispatchToProps = (dispatch) => ({
  updateLoginModal: (isOpen, isLogin) => dispatch(Actions.updateLoginModal(isOpen, isLogin)),
  onLogin: (username, password) => dispatch(Actions.loginUser(username, password)),
  onSignup: (userData) => dispatch(Actions.signupUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
