/*
The [Home] component represents the landing page of the JetsonBenefits
webpage. Contains the [Navigation] component and has a button which links to 
the [Recommendation] component.

Model filepath:
Controller filepath:
*/

import React from 'react';
import { connect } from 'react-redux';

import Actions from '../actions';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: '',
      zipcode: '',
      loginModalOpen: this.props.loginModalOpen
    };
  }

  onInputChange = (id, event) => {
    console.log(`${id} change...`);
    let value = parseInt(event.target.value);

    // TODO: Validate user input
    if (id == 'age') {
      this.setState({
        age: value
      });
    } else if (id == 'zip') {
      this.setState({
        zipcode: value
      });
    }
  }

  onFindBenefitsClick = () => {
    this.props.history.push("/recommendation");
  }

  onSignUpClick = () => {
    this.setState({ loginModalOpen: true });
  }

  section1() {
    return (
      <div id='homeS1'>
        <div id='homeS1Content'>
          <p><span>Benefits</span> that fit your life.</p>
        </div>
      </div>
    );
  }

  section2() {
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
          />
          <p>years old and I live in</p>
          <input
            type='text'
            className='homeS2Input'
            id='homeS2Input2'
            onChange={(e) => this.onInputChange('zip', e)}
            placeholder='60601'
          />
          <p>.</p><br/>
          <button type='button' id='homeS2B1' onClick={this.onFindBenefitsClick}>
            Find My Benefits
          </button><br/>
          <button type='button' id='homeS2B2' onClick={() => this.props.toggleLoginModal(false)}>
            or Sign Up
          </button>
        </div>
      </div>
    );
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
        {this.section1()}
        {this.section2()}
        {this.section3()}
        {this.section4()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginModalOpen: state.app.loginModal.isOpen
});

const mapDispatchToProps = (dispatch) => ({
  toggleLoginModal: (isOpen) => dispatch(Actions.toggleLoginModal(isOpen))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
