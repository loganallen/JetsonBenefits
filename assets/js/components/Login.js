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
      <Modal.Header>Login</Modal.Header>
    ) : (
      <Modal.Header>Sign Up</Modal.Header>
    );

    const content = this.props.login ? (
      <Modal.Content>
        <input type="email" placeholder="Email"/><br/>
        <input type="password" placeholder="Password"/><br/>
        <Button positive icon='checkmark' labelPosition='right' content='Login' />
        <p>Dont have an account yet? <button onClick={this.props.toggleLoginModalType}>Sign Up</button></p>
      </Modal.Content>
    ) : (
      <Modal.Content>
        <input type="text" placeholder="First name"/><br/>
        <input type="text" placeholder="Last name"/><br/>
        <input type="email" placeholder="Email"/><br/>
        <input type="password" placeholder="Password"/><br/>
        <Button positive icon='checkmark' labelPosition='right' content='Sign Up' />
        <p>Already have an account? <button onClick={this.props.toggleLoginModalType}>Login</button></p>
      </Modal.Content>
    );

    return (

      <div>
        <Modal size={'small'} open={this.props.open} onClose={this.props.onClose}>
          { header }
          { content }
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
  loginModalOpen: state.mainState.loginModal.isOpen,
  loginModalType: state.mainState.loginModal.type
});

const mapDispatchToProps = (dispatch) => ({
  toggleLoginModalType: () => dispatch(Actions.toggleLoginModalType())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
