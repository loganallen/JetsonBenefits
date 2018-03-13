import React from 'react';
import {Header, Button} from 'semantic-ui-react';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header id='menuTitle'>jetsonbenefits</Header>
        <div id='menuButtonWrapper'>
          <button type='button' className='menuButton'>How It Works</button>
          <button type='button' className='menuButton'>Blog</button>
          <button type='button' className='menuButton'>Resources</button>
          <button type='button' className='menuButton'>Login</button>
        </div>
      </div>
    );
  }
}

export default Navigation;
