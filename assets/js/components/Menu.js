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
import { isMobile } from '../utils';

import '../../css/menu.css';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: isMobile(this.props.deviceWidth),
      mobileMenuShowing: false
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
      isMobile: this.state.isMobile,
      mobileMenuShowing: !this.state.mobileMenuShowing
    })
  }

  openLoginModalMobile = () => {
    $('body').addClass('modal-open');
    this.props.openLoginModal();
  }

  closeLoginModalMobile = () => {
    $('body').removeClass('modal-open');
    this.props.closeLoginModal();
  }

  desktopRender = () => {
    let loginButton = this.props.isLoggedIn ?
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
        { this.props.isLoggedIn ? '' : (
          <Login isOpen={this.props.loginModalOpen} isLogin={this.props.loginModalType} onClose={this.closeLoginModal} />
        )}
      </div>
    );
  }

  mobileRender = () => {
    let loginButton = this.props.isLoggedIn ?
      (<ReactMenu.Item onClick={this.openLoginModalMobile}><p className='mobileMenuButton'>LOGIN</p></ReactMenu.Item>) :
      (<ReactMenu.Item onClick={this.props.onLogoutClick}><p className='mobileMenuButton'>LOGOUT</p></ReactMenu.Item>);
    
    return (
      <div>
        <div id='menuWrapper' className={this.props.menuTheme}>
          <Header id='menuTitle' onClick={this.onHomeClick}>jetsonbenefits</Header>
          <div id='icon-wrapper'>
            <button onClick={this.updateMobileMenu}>
              {this.props.menuTheme === 'themeWhite' ? (
                <Icon name='bars' size='huge' color='teal' />
              ) : (
                <Icon name='bars' size='huge' inverted />
              )}
            </button>
          </div>
          { this.props.isLoggedIn ? '' : (
            <Login isOpen={this.props.loginModalOpen} isLogin={this.props.loginModalType} onClose={this.closeLoginModalMobile} />
          )}
        </div>
        <ReactMenu
          vertical
          size='massive'
          id='mobileMenu'
          className={classNames({
            hidden: !this.state.mobileMenuShowing
        })}>
          <ReactMenu.Item onClick={this.fakeClick}><p className='mobileMenuButton'>HOW IT WORKS</p></ReactMenu.Item>
          <ReactMenu.Item onClick={this.fakeClick}><p className='mobileMenuButton'>BLOG</p></ReactMenu.Item>
          <ReactMenu.Item onClick={this.fakeClick}><p className='mobileMenuButton'>RESOURCES</p></ReactMenu.Item>
          {loginButton}
        </ReactMenu>
      </div>
    );
  }

  render() {
    return this.state.isMobile ? this.mobileRender() : this.desktopRender();
  }
}

const mapStateToProps = (state) => ({
  ...state,
  menuTheme: state.app.menuTheme,
  loginModalOpen: state.app.loginModal.isOpen,
  loginModalType: state.app.loginModal.isLogin,
  deviceWidth: state.app.deviceWidth,
  isLoggedIn: state.app.user.isAuth,
  userName: state.app.user.name
});

const mapDispatchToProps = (dispatch) => ({
  openLoginModal: () => dispatch(Actions.updateLoginModal(true)),
  closeLoginModal: () => dispatch(Actions.updateLoginModal(false)),
  onLogoutClick: () => dispatch(Actions.logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
