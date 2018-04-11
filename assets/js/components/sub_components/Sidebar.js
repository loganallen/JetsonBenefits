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
  }

  //Returns basic quote information (from the model)
  // ***hard coded for now ***
  getInsuraceInfo() {
  	return [{title: 'Basic Health', value: 0},
            {title: 'Term Life', value: 0},
            {title: 'Disability', value: 0}]
  }

  //Maps the insurance info into the final list that is displayed
  listContent() {
    return this.getInsuraceInfo().map((item) => (
           <List.Item key={item.title}>{item.title}${item.value}</List.Item>
          ))
  }

  render() {
    console.log(this.listContent())
    return (
      <div>
      	<List>
          {this.listContent()}
        </List>
      </div>
    );
  }
}

export default Sidebar;
