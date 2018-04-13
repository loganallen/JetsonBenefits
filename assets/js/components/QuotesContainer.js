/*
The [QuotesContainer] component displays the recommended quotes for a given user
and serves up to three [QuoteItem] compenents which each correspond to an optional
[RefineQuoteItem] component. This component is contained within the [Recommendation]
component.

Model filepath:
Controller filepath:
*/

import React from 'react';
import { connect } from 'react-redux';
import { } from 'semantic-ui-react';	
import QuoteItem from './sub_components/QuoteItem'
import '../../css/quotes.css';

class QuotesContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    //currently hard coded but will eventually pull from the db
    getQuotes = () =>{
    	return [
    	{
    		type: 'HEALTH',
    		field1: {header: 'BASIC', subheader:'PLAN TYPE'},
    		field2: {header: '$5K', subheader: 'DEDUCTIBLE'},
    		field3: {imagesrc: '', carrier: 'CARRIER'},
    		permonth: 435,
    		quoteid: 1
    	},
    	{
    		type: 'LIFE',
    		field1: {header: '1.25M', subheader:'AVERAGE AMT'},
    		field2: {header: '20YR', subheader: 'TERM'},
    		field3: {imagesrc: '', carrier: 'CARRIER'},
    		permonth: 35,
    		quoteid: 2
    	}
    	]
    }

    mapQuoteToQuoteItem = (quote) => {
    	return <QuoteItem
    			type={quote.type}
    			field1={quote.field1}
    			field2={quote.field2}
    			field3={quote.field3}
    			permonth={quote.permonth}
    			quoteid={quote.quoteid}
    			/>
    }

    getQuoteItems = (quoteInfo) => {
    	return quoteInfo.map(this.mapQuoteToQuoteItem);
    }

    render() {
        return (
            <div id="quotesContainer">
				<h1 id="quotesTitle">YOUR BENEFITS</h1>
            	{this.getQuoteItems(this.getQuotes())}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(QuotesContainer);

