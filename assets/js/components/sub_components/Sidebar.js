/*
The [Sidebar] component uses the user information to query the db for simplified
quote information.

Model filepath:
Controller filepath:
*/

import React from 'react';
import {List, Label, Icon} from 'semantic-ui-react';

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
      <List.Item key={item.title}>
        <div className="sidebar-item">
          <div className={item.active == true ? 'activeText' : 'greyText'}>
            <Icon name='circle' className='sidebarIcon'/>
            <p className='sidebarTextLeft'>{item.title}</p>
            <p className='sidebarTextRight'>${item.value}</p>
          </div>
        </div>
      </List.Item>
    ));
  }

  insuranceSum = () => {
    return this.state.values.reduce((acc, item) => (acc + parseInt(item.value)), 0)
  }

  render() {
    return (
      <div id='sidebar' className='sidebar'>
        <h1 id="sidebar-title">JETSON RECOMMENDS</h1>
      	<List>
          {this.listContent()}
        </List>
        <div className='sidebarSum'>
          <p id="sum">${this.insuranceSum()}-${this.insuranceSum()}</p>
          <p id="label">per month</p>
        </div>
      </div>
    );
  }
}

export default Sidebar;
