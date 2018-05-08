/*
The [QuoteItem] component contains the most relevent quote information for a 
given area of insurance. Contains a tab which drops down the [RefineQuoteItem]
component for the given area of insurance.
*/

import React from 'react';
import { Icon } from 'semantic-ui-react';
import classNames from 'classnames';

import RefineQuoteItem from './RefineQuoteItem';
import { isLoggedIn, authToken } from '../../auth';
import { InsuranceTypes } from '../../utils';

/**
 * props: {
 *   insuranceType,
 *   insuranceData,
 *   quote,
 *   userData,
 *   isMobile,
 *   updateUserData,
 *   updateInsuranceData,
 *   saveInsuranceData,
 *   loadInsuranceQuote,
 *   generateInsuranceQuotes,
 *   onCoverageClick
 * }
 */

class QuoteItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refineOpen: false,
    };
  }

  getRefineComponent = () => (
    <RefineQuoteItem 
      insuranceType={this.props.insuranceType}
      insuranceData={this.props.insuranceData}
      userData={this.props.userData}
      updateUserData={this.props.updateUserData}
      updateInsuranceData={this.props.updateInsuranceData}
      onUpdateQuoteClicked={this.onUpdateQuoteClicked}
    />
  );

  onUpdateQuoteClicked = () => {
    if (isLoggedIn()) {
      // Save insurance info and load new insurance quotes
      this.props.saveInsuranceData(authToken(), this.props.insuranceType);
      this.props.loadInsuranceQuote(authToken(), this.props.insuranceType);
    } else {
      this.props.generateInsuranceQuotes();
    }
    this.onRefineClick();
  }

  onRefineClick = (event) => {
    this.setState({
      refineOpen: !this.state.refineOpen
    });
  }

  healthQuoteContent = () => {
    return (
      <div className='fields'>
        <div className='field'>
          <p className='headerText'>{this.props.quote.plan_type}</p>
          <p className='subheaderText'>Plan Type</p>
        </div>
        <div className='field'>
          <p className='headerText'>{`$${this.props.quote.deductible}`}</p>
          <p className='subheaderText'>Deductible</p>
        </div>
        <div className='field-carrier'>
          <p className='logo'>{this.props.quote.carrier}</p>
          <p className='subheaderText'>Carrier</p>
        </div>
      </div>
    );
  }

  lifeQuoteContent = () => {
    return (
      <div className='fields'>
        <div className='field'>
          <p className='headerText'>{`$${this.props.quote.policy_amount}`}</p>
          <p className='subheaderText'>Policy Amount</p>
        </div>
        <div className='field'>
          <p className='headerText'>{`${this.props.quote.policy_term}YR`}</p>
          <p className='subheaderText'>Term</p>
        </div>
        <div className='field-carrier'>
          <p className='logo'>{this.props.quote.carrier}</p>
          <p className='subheaderText'>Carrier</p>
        </div>
      </div>
    );
  }

  disabilityQuoteContent = () => {
    return (
      <div className='fields'>
        <div className='field'>
          <p className='headerText'>{`$${this.props.quote.benefit_amount}`}</p>
          <p className='subheaderText'>Benefit Amount</p>
        </div>
        <div className='field'>
          <p className='headerText'>{`${this.props.quote.duration}YR`}</p>
          <p className='subheaderText'>Duration</p>
        </div>
        <div className='field-carrier'>
          <p className='logo'>{`$${this.props.quote.monthly}`}</p>
          <p className='subheaderText'>Monthly Cost</p>
        </div>
      </div>
    );
  }

  getQuoteContent = () => {
    let quoteContent = (type => {
      switch (type) {
        case InsuranceTypes.HEALTH:
          return this.healthQuoteContent();
        case InsuranceTypes.LIFE:
          return this.lifeQuoteContent();
        case InsuranceTypes.DISABILITY:
          return this.disabilityQuoteContent();
        default:
          return;
      }
    })(this.props.insuranceType);

    return quoteContent;
  }

  desktopRender() {
    return (
      <div className='quoteOuterWrapper'>
        <div className={classNames('quoteItem', { 'refine-open': this.state.refineOpen })}>

          <div className='quoteLeft'>
            <div className='top'>
              <div className="insuranceType">{this.props.insuranceType} INSURANCE</div>
              {this.props.insuranceType != InsuranceTypes.DISABILITY && <button
                className='refineButton'
                onClick={(e) => this.onRefineClick(e)}>
                Refine <Icon name={classNames('angle', {
                  up: this.state.refineOpen,
                  down: !this.state.refineOpen
                })} />
              </button>}
            </div>
            {this.getQuoteContent()}
          </div>

          <div className='quoteRight'>
            <div className='permonth'>
              <p className='estimatedLabel'>estimated</p>
              <p className='headerText'>'TODO'</p>
              <p className='permonthLabel'>PER MONTH</p>
            </div>
            <button
              className='getCoveredButton'
              onClick={() => this.props.onCoverageClick(null)}
            >GET COVERED
            </button>
          </div>

        </div>

        {this.state.refineOpen &&
          <div className='refineWrapper'>
            {this.getRefineComponent()}
          </div>}
      </div>
    );
  }

  mobileRender() {
    return (
      <div className='quoteOuterWrapper'>
        <div className='quoteItem'>

          <div className='top'>
            <div className="insuranceType">{this.props.insuranceType} INSURANCE</div>
            {this.props.insuranceType != InsuranceTypes.DISABILITY && <button
              className='refineButton'
              onClick={(e) => this.onRefineClick(e)}>
              Refine <Icon name={classNames('angle', {
                up: this.state.refineOpen,
                down: !this.state.refineOpen
              })} />
            </button>}
          </div>

          {this.getQuoteContent()}

          <button
            className='getCoveredButton'
            onClick={() => this.props.onCoverageClick(null)}
          >GET COVERED
          </button>

          {this.state.refineOpen &&
            <div className='refineWrapper'>
              {this.getRefineComponent()}
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
