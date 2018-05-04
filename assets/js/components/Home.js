/*
The [Home] component represents the landing page of the JetsonBenefits
webpage. Contains the [Navigation] component and has a button which links to 
the [Recommendation] component.

Model filepath:
Controller filepath:
*/

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';

import Menu from './Menu';
import Actions from '../actions';
import { isLoggedIn, authToken } from '../auth';
import { isMobile } from '../utils';

import '../../css/home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: isMobile(this.props.deviceWidth)
    };
  }

  componentWillMount() {
    this.props.changeMenuTheme('themeWhite');
    if (isLoggedIn()) {
      this.props.loadUserInfo(authToken());
    }
  }

  onInputChange = (id, event) => {
    let value = event.target.value;

    // TODO: Validate user input
    if (id == 'age') {
      this.props.updateUserData('age', value);
    } else if (id == 'zipcode') {
      this.props.updateUserData('zipcode', value);
    }
  }

  onFindBenefitsClick = () => {
    this.props.history.push("/recommendation");
  }

  section1() {
    return (
      <div id='homeS1'>
        <div id='homeS1Content'
          className={ classNames({ hidden: this.state.isMobile }) }>
          <p><span>Benefits</span> that fit your life.</p>
        </div>
      </div>
    );
  }

  section2() {
    if (this.state.isMobile) {
      return (
        <div id='homeS2'>
          <div id='homeS2Content'>
            <div id="part-one">
              <p>I'm</p>
              <input
                type='number'
                className='homeS2Input'
                id='homeS2Input1'
                onChange={(e) => this.onInputChange('age', e)}
                placeholder='30'
                value={this.props.age}
              />
              <p>years old</p>
            </div>
            <div id='part-two'>
              <p> and I live in</p>
              <input
                type='number'
                className='homeS2Input'
                id='homeS2Input2'
                onChange={(e) => this.onInputChange('zipcode', e)}
                placeholder='60601'
                value={this.props.zipcode}
              />
              <p>.</p>
            </div>
            <br/>
            <button type='button' id='homeS2B1' onClick={this.onFindBenefitsClick}>
              FIND MY BENEFITS
            </button><br/>
          </div>
        </div>
      );
    } else {
      return (
        <div id='homeS2'>
          <div id='homeS2Content'>
            <p>I'm</p>
            <input
              type='text'
              className='homeS2Input'
              id='homeS2Input1'
              onChange={(e) => this.onInputChange('age', e)}
              placeholder='30'
              value={this.props.age}
            />
            <p>years old and I live in</p>
            <input
              type='text'
              className='homeS2Input'
              id='homeS2Input2'
              onChange={(e) => this.onInputChange('zipcode', e)}
              placeholder='60601'
              value={this.props.zipcode}
            />
            <p>.</p><br/>
            <button type='button' id='homeS2B1' onClick={this.onFindBenefitsClick}>
              FIND MY BENEFITS
            </button><br/>
            {!isLoggedIn() && (
              <button type='button' id='homeS2B2' onClick={() => this.props.updateLoginModal(true, false)}>
                or Sign Up
            </button>
            )}
          </div>
        </div>
      );
    }
  }

  section3() {
    return (
      <div id='homeS3'>
        <div id='homeS3Content'>
          <p>Benefits packages for today's independent worker.</p>
        </div>
      </div>
    );
  }

  section4() {
    return (
      <div id='homeS4'>
        <h3>Trusted Partners</h3>
        <p>We work with America's most trusted insurance companies to get you the most dependable products.</p>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Menu history={this.props.history} />
        {this.section1()}
        {this.section2()}
        {this.section3()}
        {this.section4()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  age: state.app.userData.age,
  zipcode: state.app.userData.zipcode,
  deviceWidth: state.app.deviceWidth
});

const mapDispatchToProps = (dispatch) => ({
  changeMenuTheme: (theme) => dispatch(Actions.changeMenuTheme(theme)),
  updateLoginModal: (isOpen, isLogin) => dispatch(Actions.updateLoginModal(isOpen, isLogin)),
  updateUserData: (key, value) => dispatch(Actions.updateUserData(key, value)),
  loadUserInfo: (token) => dispatch(Actions.fetchUserInfo(token)),
  postUserInfo: (token, data) => dispatch(Actions.postUserInfo(token, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
