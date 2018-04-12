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
           <Icon name='circle thin' className='sidebarIcon'/>
           <div className={item.active == true ? 'activeText' : 'greyText'}>
            <p className='sidebarTextLeft'>{item.title}</p>
            <p className='sidebarTextRight'>${item.value}</p>
            </div>
           </List.Item>
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
