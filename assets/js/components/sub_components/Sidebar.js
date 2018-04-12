/*
The [Sidebar] component uses the user information to query the db for simplified
quote information.

Model filepath:
Controller filepath:
*/

import React from 'react';
import {List, Label } from 'semantic-ui-react';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      values: this.props.values
    }
  }

  //Maps the insurance info into the final list that is displayed
  listContent = () => {
    return this.state.values.map((item) => (
           <List.Item key={item.title}>{item.title}${item.value}</List.Item>
          ))
  }

  render() {
    console.log(this.listContent())
    return (
      <div id='sidebar' className='sidebar'>
        <h1 id="sidebar-title">Jetson Recommends</h1>
      	<List>
          {this.listContent()}
        </List>
      </div>
    );
  }
}

export default Sidebar;
