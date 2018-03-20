/*
The [Navigation] component is a header bar that gives the user buttons which link
to the [How It Works], [Blog], [Resources], and [Login] components. Contained within
both the [Home] and [Recommendation] components.

Model filepath:
Controller filepath:
*/

import React from 'react';
import {Header, Button} from 'semantic-ui-react';

import {connect} from 'react-redux';

import Login from './Login';
import Actions from '../actions';

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='menuWrapper'>
        <Header id='menuTitle'>jetsonbenefits</Header>
        <div id='menuButtonWrapper'>
          <button type='button' className='menuButton'>HOW IT WORKS</button>
          <button type='button' className='menuButton'>BLOG</button>
          <button type='button' className='menuButton'>RESOURCES</button>
          <button type='button' className='menuButton' onClick={() => this.props.toggleLoginModal(true)}>LOGIN</button>
        </div>
        <Login open={this.props.loginModalOpen} login={this.props.loginModalType} onClose={() => this.props.toggleLoginModal(true)} />
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
  toggleLoginModal: (isLogin) => dispatch(Actions.toggleLoginModal(isLogin))
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);