/**
 * LoginModal.js: This modal component prompts the user to enter login credentials
 * or create an account. There are separate mobile and desktop renders.
 */

import React from 'react';
import {Modal, Button, Icon} from 'semantic-ui-react';
import classNames from 'classnames';

import {connect} from 'react-redux';

import Actions from '../actions';
import { isMobile } from '../utils';

import '../../css/login.css';

class LoginModal extends React.Component {
  
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

  // Reroute to [Recommendation.js] upon successful login
  onLoginClick = () => {
    let callback = (success) => {
      if (success) { this.props.history.push('/recommendation'); }
    }
    if (this.state.loginEmail.length > 0 && this.state.loginPassword.length > 0) {
      this.props.onLogin(this.state.loginEmail, this.state.loginPassword, callback);
    }
  }

  onSignupClick = () => {
    const userData = {
      firstName: this.state.signupFirstName,
      lastName: this.state.signupLastName,
      email: this.state.signupEmail,
      password: this.state.signupPassword
    }

    // TODO: Better validation for proper email, etc.
    let valid = Object.values(userData).reduce((acc, val) => acc && val.length > 0, true);
   
    if (valid) {
      this.props.onSignup(userData);
    }
  }

  // Updates the state for an input change
  // Requires the [name] of the input matches the state variable
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  desktopRender = () => {
    const header = this.props.isTypeLogin ? (
      <div className="loginHeaderWrapper">
        <h1 className="loginHeader">Sign In</h1>
      </div>
    ) : (
      <div className="loginHeaderWrapper">
        <h1 className="loginHeader">Create an Account</h1>
        <p className="loginSubheader">Get started finding your personalized benefits package today.</p>
      </div>
    );

    const content = this.props.isTypeLogin ? (
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
              <img src='static/img/login.svg' />
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
    const content = this.props.isTypeLogin ? (
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
        <button id="mobileModalClose" onClick={this.props.onClose}><Icon name='close' size='huge' color='black' /></button>
        <div id="modalImg">
          <img src='static/img/login.svg' />
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
  deviceWidth: state.app.deviceWidth
});

const mapDispatchToProps = (dispatch) => ({
  updateLoginModal: (isOpen, isTypeLogin) => dispatch(Actions.updateLoginModal(isOpen, isTypeLogin)),
  onLogin: (username, password, cb) => dispatch(Actions.loginUser(username, password, cb)),
  onSignup: (userData) => dispatch(Actions.signupUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
