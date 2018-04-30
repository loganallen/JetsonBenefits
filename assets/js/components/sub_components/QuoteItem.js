/*
The [QuoteItem] component contains the most relevent quote information for a 
given area of insurance. Contains a tab which drops down the [RefineQuoteItem]
component for the given area of insurance.
*/

import React from 'react';
import { Icon } from 'semantic-ui-react';
import classNames from 'classnames';

import RefineQuoteItem from './RefineQuoteItem';

class QuoteItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      field1: {header: this.props.field1.header, subheader: this.props.field1.subheader},
      field2: {header: this.props.field2.header, subheader: this.props.field2.subheader},
      field3: {imagesrc: this.props.field3.imagesrc, carrier: this.props.field3.carrier},
      permonth: this.props.permonth,
      quoteid: this.props.quoteid,
      refineOpen: false,
    };
  }

  getRefineComponent = (insuranceType) => (
    <RefineQuoteItem 
      insuranceType={insuranceType}
      userData={this.props.userData}
      updateUserData={this.props.updateUserData}
      onUpdateQuoteClicked={this.onUpdateQuoteClicked}
    />
  );

  onUpdateQuoteClicked = () => {
    this.onRefineClick();
    // TODO: backend call
  }

  onRefineClick = (event) => {
    this.setState({
      refineOpen: !this.state.refineOpen
    });
  }

  desktopRender() {
    return (
      <div className='quoteOuterWrapper'>
        <div className={classNames('quoteItem', { 'refine-open': this.state.refineOpen })}>
          <div className='quoteLeft'>

            <div className='top'>
              <div className="insuranceType">{this.props.type} INSURANCE</div>
              {this.state.insuranceType != 'disability' && <button
                className='refineButton'
                onClick={(e) => this.onRefineClick(e)}>
                Refine <Icon name={classNames('angle', {
                  up: this.state.refineOpen,
                  down: !this.state.refineOpen
                })} />
              </button>}
            </div>

            <div className='fields'>
              <div className='field'>
                <p className='headerText'> {this.state.field1.header} </p>
                <p className='subheaderText'> {this.state.field1.subheader} </p>
              </div>
              <div className='field'>
                <p className='headerText'> {this.state.field2.header} </p>
                <p className='subheaderText'> {this.state.field2.subheader} </p>
              </div>
              <div className='field'>
                <p className='logo'> LOGO </p>
                <p className='subheaderText'> {this.state.field3.carrier} </p>
              </div>
            </div>

          </div>
          <div className='quoteRight'>

            <div className='permonth'>
              <p className='estimatedLabel'>estimated</p>
              <p className='headerText'>${this.state.permonth}</p>
              <p className='permonthLabel'>PER MONTH</p>
            </div>

            <button
              className='getCoveredButton'
              onClick={() => this.props.onCoverageClick(this.state.quoteid)}
            >GET COVERED
            </button>

          </div>
        </div>

        {this.state.refineOpen &&
          <div className='refineWrapper'>
            {this.getRefineComponent(this.state.type)}
          </div>}
      </div>
    );
  }

  mobileRender() {
    return (
      <div className='quoteOuterWrapper'>
        <div className='quoteItem'>

          <div className='top'>
            <div className="insuranceType">{this.props.type} INSURANCE</div>
            {this.state.insuranceType != 'disability' && <button
              className='refineButton'
              onClick={(e) => this.onRefineClick(e)}>
              Refine <Icon name={classNames('angle', {
                up: this.state.refineOpen,
                down: !this.state.refineOpen
              })} />
            </button>}
          </div>

          <div className='fields'>
            <div className='field'>
              <p className='subheaderText'> {this.state.field1.subheader} </p>
              <p className='headerText'> {this.state.field1.header} </p>
            </div>
            <div className='field'>
              <p className='subheaderText'> {this.state.field2.subheader} </p>
              <p className='headerText'> {this.state.field2.header} </p>
            </div>
            <div className='field'>
              <p className='subheaderText'> {this.state.field3.carrier} </p>
              <p className='logo'> LOGO </p>
            </div>
          </div>

          <button
            className='getCoveredButton'
            onClick={() => this.props.onCoverageClick(this.state.quoteid)}
          >GET COVERED
          </button>

          {this.state.refineOpen &&
            <div className='refineWrapper'>
              {this.getRefineComponent(this.state.type)}
            </div>}

        </div>
      </div>
    );
  }

  render() {
    return this.props.isMobile ? this.mobileRender() : this.desktopRender();
  }
}

export default QuoteItem;
