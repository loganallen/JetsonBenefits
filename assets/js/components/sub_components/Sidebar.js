/*
The [Sidebar] component uses the user information to query the db for simplified
quote information.

Model filepath:
Controller filepath:
*/

import React from 'react';
import { List, Label, Icon, Breadcrumb } from 'semantic-ui-react';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      values: [
        { title: 'Basic Health', value: 0, active: true },
        { title: 'Term Life', value: 0, active: true },
        { title: 'Disability', value: 0, active: true },
        { title: 'Dental', value: 0, active: false },
        { title: 'Vision', value: 0, active: false },
        { title: 'Critical Illness', value: 0, active: false }
      ]
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
            {/* <p className='sidebarTextRight'>${item.value}</p> */}
            <br/>
          </div>
        </div>
      </List.Item>
    ));
  }

  insuranceSum = () => {
    return this.state.values.reduce((acc, item) => (acc + parseInt(item.value)), 0)
  }

  breadcrumbs = () => {
		return this.props.isMobile && (
      <div id="breadcrumbWrapper">
        <Breadcrumb size='massive'>
          <Breadcrumb.Section link onClick={() => this.props.updateStage('questions')}>Personal Info</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section link active>Recommendations</Breadcrumb.Section>
        </Breadcrumb>
      </div>
		);
	}

  render() {
    return (
      <div id='sidebarWrapper'>
        {this.breadcrumbs()}
        <h1 id="sidebarTitle">JETSON RECOMMENDS</h1>
      	<List>
          {this.listContent()}
        </List>
        <div className='sidebarSum'>
          {/* <p id="sum">${this.insuranceSum()}-${this.insuranceSum()}</p>
          <p id="label">per month</p> */}
        </div>
        {this.props.isMobile && (
          <button
            id='sidebarNextButton'
            onClick={this.props.onNextClick}
          >Show Quotes</button>
        )}
      </div>
    );
  }
}

export default Sidebar;
