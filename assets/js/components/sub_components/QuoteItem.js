/*
The [QuoteItem] component contains the most relevent quote information for a 
given area of insurance. Contains a tab which drops down the [RefineQuoteItem]
component for the given area of insurance.

Model filepath:
Controller filepath:
*/

import React from 'react';
import {} from 'semantic-ui-react';

class QuoteItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      field1: {header: this.props.field1.header, subheader: this.props.field1.subheader},
      field2: {header: this.props.field2.header, subheader: this.props.field2.subheader},
      field3: {imagesrc: this.props.imagesrc, carrier: this.props.carrier},
      permonth: this.props.permonth,
      quoteid: this.props.quoteid
    };
  }

  render() {
    return (
      <div>
        <div className='topbar'>
          <div className='firsttab'>
            {this.props.type} INSURANCE
          </div>
          <button  
                className='refineButton'
                onClick={(e) => this.props.onRefineClick(e)}>
                Refine
              </button>
        </div>
        <div className='fields'>
          <div className='field1'>
            <p className='headerText'> {this.state.field1.header} </p>
            <p className='subheaderText'> {this.state.field1.subheader} </p>
          </div>
          <div className='field2'>
            <p className='headerText'> {this.state.field2.header} </p>
            <p className='subheaderText'> {this.state.field2.subheader} </p>
          </div>
          <div className='field3'>
            <p className='logo'> LOGO </p>
            <p className='subheaderText'> {this.state.field3.carrier} </p>
          </div>
          <div className='permonth'>
            <p className='headerText'>{this.state.permonth}</p>
            <button 
                  className='getCoveredButton'
                  onClick={() => this.props.onCoverageClick(this.state.quoteid)}>
                  GET COVERED
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default QuoteItem;
