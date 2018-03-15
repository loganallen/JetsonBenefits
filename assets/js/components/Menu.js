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
          <button type='button' className='menuButton'>HOW IT WORKS</button>
          <button type='button' className='menuButton'>BLOG</button>
          <button type='button' className='menuButton'>RESOURCES</button>
          <button type='button' className='menuButton'>LOGIN</button>
        </div>
      </div>
    );
  }
}

export default Menu;
