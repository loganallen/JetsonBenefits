/*
The [Navigation] component is a header bar that gives the user buttons which link
to the [How It Works], [Blog], [Resources], and [Login] components. Contained within
both the [Home] and [Recommendation] components.

Model filepath:
Controller filepath:
*/

import React from 'react';
import { connect } from 'react-redux';
import {Header, Button} from 'semantic-ui-react';

import Login from './Login';
import Actions from '../actions';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id='menuWrapper' className={this.props.menuTheme}>
        <Header id='menuTitle'>jetsonbenefits</Header>
        <div id='menuButtonWrapper'>
          <button type='button' className='menuButton'>HOW IT WORKS</button>
          <button type='button' className='menuButton'>BLOG</button>
          <button type='button' className='menuButton'>RESOURCES</button>
          <button type='button' className='menuButton' onClick={this.props.openLoginModal}>LOGIN</button>
        </div>
        <Login isOpen={this.props.loginModalOpen} isLogin={this.props.loginModalType} onClose={this.props.closeLoginModal} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
  menuTheme: state.app.menuTheme,
  loginModalOpen: state.app.loginModal.isOpen,
  loginModalType: state.app.loginModal.isLogin
});

const mapDispatchToProps = (dispatch) => ({
  openLoginModal: () => dispatch(Actions.updateLoginModal(true, true)),
  closeLoginModal: () => dispatch(Actions.updateLoginModal(false, true))
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
