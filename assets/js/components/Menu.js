/*
The [Navigation] component is a header bar that gives the user buttons which link
to the [How It Works], [Blog], [Resources], and [Login] components. Contained within
both the [Home] and [Recommendation] components.

Model filepath:
Controller filepath:
*/

import React from 'react';
import {Header, Button} from 'semantic-ui-react';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id='menuWrapper'>
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

export default Menu;
