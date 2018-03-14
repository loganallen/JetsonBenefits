import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: '',
      zipcode: ''
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

  }

  onSignUpClick = () => {

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
          />
          <p>years old and I live in</p>
          <input
            type='text'
            className='homeS2Input'
            id='homeS2Input2'
            onChange={(e) => this.onInputChange('zip', e)}
          />
          <p>.</p><br/>
          <button type='button' id='homeS2B1' onClick={this.onFindBenefitsClick}>
            Find My Benefits
          </button><br/>
          <button type='button' id='homeS2B2' onClick={this.onSignUpClick}>
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

export default Home;
