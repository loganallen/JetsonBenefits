/**
 * Sidebar.js: This component displays the insurance quotes recommended to the user
 * given the data provided thus far. It is contained in the [QuestionsContainer.js]
 * component on desktop interfaces, but is displayed separately as the [recommendation]
 * page on mobile interfaces.
 * 
 * TODO: Update recommended items dynamically
 */

import React from 'react';
import { List, Label, Icon, Breadcrumb } from 'semantic-ui-react';
import { RecommendationStages } from '../../utils';

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

  // Maps the insurance info into the final list that is displayed
  recommendedInsuranceItems = () => {
    let items = this.state.values.map((item) => (
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

    return (
      <List>{items}</List>
    );
  }

  insuranceSum = () => {
    return this.state.values.reduce((acc, item) => (acc + parseInt(item.value)), 0)
  }

  // Show breadcrumbs only on mobile because this component is a separate stage (recommendation)
  breadcrumbs = () => {
		return this.props.isMobile && (
      <div id="breadcrumbWrapper">
        <Breadcrumb size='massive'>
          <Breadcrumb.Section
            link
            onClick={() => this.props.updateStage(RecommendationStages.questions)}
            >Personal Info
          </Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section link active>Recommendations</Breadcrumb.Section>
        </Breadcrumb>
      </div>
		);
	}

  // TODO: Show total quote cost estimates
  render() {
    return (
      <div id='sidebarWrapper'>
        {this.breadcrumbs()}
        <h1 id="sidebarTitle">JETSON RECOMMENDS</h1>
      	{this.recommendedInsuranceItems()}
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
