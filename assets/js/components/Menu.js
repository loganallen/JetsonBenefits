/**
 * Menu.js: The navigation menu component that reroutes to other components. This component
 * is rendered within each of the [Home.js] and [Recommendation.js] components. It is the
 * delegate for logging out.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Header, Button, Icon, Menu as ReactMenu } from 'semantic-ui-react';
import classNames from 'classnames';

import LoginModal from './LoginModal';
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
    this.props.history.push('/home');
  }

  onHowItWorkClick = () => {
    // TODO: Navigate to How It Works page
    // this.props.history.push('/howItWorks');
  }

  onBlogClick = () => {
    // TODO: Navigate to Blog page
    // this.props.history.push('/blog');
  }

  onResourcesClick = () => {
    // TODO: Navigate to Resources page
    // this.props.history.push('/resources');
  }

  // Redirect to [Home.js] upon logout
  onLogoutClick = () => {
    let callback = (success) => {
      if (success) { this.props.history.push('/home'); }
    }
    this.props.logout(callback);
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
      (<button type='button' className='menuButton' onClick={this.onLogoutClick}>LOGOUT</button>) :
      (<button type='button' className='menuButton' onClick={this.props.openLoginModal}>LOGIN</button>);

    return (
      <div id='menuWrapper' className={this.props.menuTheme}>
        <Header id='menuTitle' onClick={this.onHomeClick}>jetsonbenefits</Header>
        <div id='menuButtonWrapper'>
          <button type='button' onClick={this.onHowItWorksClick} className='menuButton'>HOW IT WORKS</button>
          <button type='button' onClick={this.onBlogClick} className='menuButton'>BLOG</button>
          <button type='button' onClick={this.onResourcesClick} className='menuButton'>RESOURCES</button>
          {loginButton}
        </div>
        {!this.props.isLoggedIn && (
          <LoginModal
            isOpen={this.props.loginModalOpen}
            isTypeLogin={this.props.loginModalType}
            onClose={this.props.closeLoginModal}
            history={this.props.history}
          />
        )}
      </div>
    );
  }

  mobileRender = () => {
    let loginButton = this.props.isLoggedIn ?
      (<ReactMenu.Item onClick={this.openLoginModalMobile}><p className='mobileMenuButton'>LOGIN</p></ReactMenu.Item>) :
      (<ReactMenu.Item onClick={this.onLogoutClick}><p className='mobileMenuButton'>LOGOUT</p></ReactMenu.Item>);
    
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
          {!this.props.isLoggedIn && (
            <LoginModal
              isOpen={this.props.loginModalOpen}
              isTypeLogin={this.props.loginModalType}
              onClose={this.closeLoginModalMobile}
              history={this.props.history}
            />
          )}
        </div>
        <ReactMenu
          vertical
          size='massive'
          id='mobileMenu'
          className={classNames({ hidden: !this.state.mobileMenuShowing })
        }>
          <ReactMenu.Item onClick={this.onHowItWorksClick}><p className='mobileMenuButton'>HOW IT WORKS</p></ReactMenu.Item>
          <ReactMenu.Item onClick={this.onBlogClick}><p className='mobileMenuButton'>BLOG</p></ReactMenu.Item>
          <ReactMenu.Item onClick={this.onResourcesClick}><p className='mobileMenuButton'>RESOURCES</p></ReactMenu.Item>
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
  menuTheme: state.app.menuTheme,
  loginModalOpen: state.app.loginModal.isOpen,
  loginModalType: state.app.loginModal.isTypeLogin,
  deviceWidth: state.app.deviceWidth,
  isLoggedIn: state.app.user.isAuth
});

const mapDispatchToProps = (dispatch) => ({
  openLoginModal: () => dispatch(Actions.updateLoginModal(true)),
  closeLoginModal: () => dispatch(Actions.updateLoginModal(false)),
  logout: (cb) => dispatch(Actions.logoutUser(cb))
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
