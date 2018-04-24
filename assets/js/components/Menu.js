/*
The [Navigation] component is a header bar that gives the user buttons which link
to the [How It Works], [Blog], [Resources], and [Login] components. Contained within
both the [Home] and [Recommendation] components.

Model filepath:
Controller filepath:
*/

import React from 'react';
import { connect } from 'react-redux';
import { Header, Button, Icon, Menu as ReactMenu } from 'semantic-ui-react';
import classNames from 'classnames';

import Login from './Login';
import Actions from '../actions';
import { isLoggedIn } from '../auth';
import { is_mobile } from '../utils';

import '../../css/menu.css';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_mobile: is_mobile(this.props.deviceWidth),
      mobileMenu: false
    };
  }

  onHomeClick = () => {
    // TODO
  }

  fakeClick = () => {
    console.log('menu item clicked');
  }

  updateMobileMenu = () => {
    this.setState({
      is_mobile: this.state.is_mobile,
      mobileMenu: !this.state.mobileMenu
    })
  }

  desktopRender = () => {
    let loginButton = isLoggedIn() ?
      (<button type='button' className='menuButton' onClick={this.props.onLogoutClick}>LOGOUT</button>) :
      (<button type='button' className='menuButton' onClick={this.props.openLoginModal}>LOGIN</button>);

    return (
      <div id='menuWrapper' className={this.props.menuTheme}>
        <Header id='menuTitle' onClick={this.onHomeClick}>jetsonbenefits</Header>
        <div id='menuButtonWrapper'>
          <button type='button' className='menuButton'>HOW IT WORKS</button>
          <button type='button' className='menuButton'>BLOG</button>
          <button type='button' className='menuButton'>RESOURCES</button>
          {loginButton}
        </div>
        <Login isOpen={this.props.loginModalOpen} isLogin={this.props.loginModalType} onClose={this.props.closeLoginModal} />
      </div>
    );
  }

  mobileRender = () => {
    return (
      <div>
        <div id='menuWrapper' className={this.props.menuTheme}>
          <Header id='menuTitle' onClick={this.onHomeClick}>jetsonbenefits</Header>
          <div id='icon-wrapper'>
            <button onClick={this.updateMobileMenu}>
              <Icon name='bars' size='huge' color='teal' />
            </button>
          </div>
          <Login isOpen={this.props.loginModalOpen} isLogin={this.props.loginModalType} onClose={this.props.closeLoginModal} />
        </div>
        <ReactMenu vertical size='massive' floated='right' className={classNames({ hidden: !this.state.mobileMenu })}>
              <ReactMenu.Item onClick={this.fakeClick}><p className='mobileMenuButton'>HOW IT WORKS</p></ReactMenu.Item>
              <ReactMenu.Item onClick={this.fakeClick}><p className='mobileMenuButton'>BLOG</p></ReactMenu.Item>
              <ReactMenu.Item onClick={this.fakeClick}><p className='mobileMenuButton'>RESOURCES</p></ReactMenu.Item>
              <ReactMenu.Item onClick={this.props.openLoginModal}><p className='mobileMenuButton'>LOGIN</p></ReactMenu.Item>
        </ReactMenu>
      </div>
    );
  }

  render() {
    return this.state.is_mobile ? this.mobileRender() : this.desktopRender();
  }
}

const mapStateToProps = (state) => ({
  ...state,
  menuTheme: state.app.menuTheme,
  loginModalOpen: state.app.loginModal.isOpen,
  loginModalType: state.app.loginModal.isLogin,
  deviceWidth: state.app.deviceWidth
});

const mapDispatchToProps = (dispatch) => ({
  openLoginModal: () => dispatch(Actions.updateLoginModal(true)),
  closeLoginModal: () => dispatch(Actions.updateLoginModal(false)),
  onLogoutClick: () => dispatch(Actions.logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
