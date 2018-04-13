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

class Login extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    const header = this.props.login ? (
      <div className="loginHeaderWrapper">
        <h1 className="loginHeader">Sign in</h1>
      </div>
    ) : (
      <div className="loginHeaderWrapper">
        <h1 className="loginHeader">Sign Up</h1>
        <p className="loginSubheader">Get started finding your personalized benefits package today.</p>
      </div>
    );

    const content = this.props.login ? (
      <div>
        <input className="modalInput" type="email" placeholder="email"/>
        <input className="modalInput" type="password" placeholder="password"/>
        <button className="modalButton">
          Sign in
         </button> 
        <p className="modalFooter">Dont have an account yet? <button className='typeSwitcher' onClick={this.props.toggleLoginModalType}>Sign Up</button></p>
      </div>
    ) : (
      <div>
        <input className="modalInput" type="text" placeholder="name"/>
        <input className="modalInput" type="email" placeholder="email"/>
        <input className="modalInput" type="password" placeholder="password"/>
        <button className="modalButton">
          Sign up
         </button> 
        <p className="modalFooter">Already have an account? <button className='typeSwitcher' onClick={this.props.toggleLoginModalType}>Login</button></p>
      </div>
    );

    return (

      <div>
        <Modal size={'large'} open={this.props.open} onClose={this.props.onClose}>
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
  ...state,
  loginModalOpen: state.app.loginModal.isOpen,
  loginModalType: state.app.loginModal.type
});

const mapDispatchToProps = (dispatch) => ({
  toggleLoginModalType: () => dispatch(Actions.toggleLoginModalType())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
