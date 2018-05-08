/*
The [QuotesContainer] component displays the recommended quotes for a given user
and serves up to three [QuoteItem] compenents which each correspond to an optional
[RefineQuoteItem] component. This component is contained within the [Recommendation]
component.
*/

import React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb } from 'semantic-ui-react';	

import QuoteItem from './sub_components/QuoteItem';
import Actions from '../actions';
import { isLoggedIn, authToken } from '../auth';

import '../../css/quotes.css';

class QuotesContainer extends React.Component {
    constructor(props) {
			super(props);
		}
		
		componentWillMount() {
			if (isLoggedIn()) {
				this.props.loadInsuranceQuotes(authToken());
			} else {
				// TODO: Generate insurance quotes
				this.props.generateInsuranceQuotes();
			}
		}

    quoteItems = () => {
			let quotes = Object.keys(this.props.quotes).map(insuranceType => (
				<QuoteItem
					key={insuranceType}
					insuranceType={insuranceType}
					quote={this.props.quotes[insuranceType]}
					userData={this.props.userData}
					updateUserData={this.props.updateUserData}
					isMobile={this.props.isMobile}
				/>
			));

    	return quotes;
		}
		
		breadcrumbs = () => {
			return this.props.isMobile ? (
				<Breadcrumb size='massive'>
					<Breadcrumb.Section link onClick={() => this.props.updateStage('questions')}>Personal Info</Breadcrumb.Section>
					<Breadcrumb.Divider>/</Breadcrumb.Divider>
					<Breadcrumb.Section link onClick={() => this.props.updateStage('recommendation')}>Recommendations</Breadcrumb.Section>
					<Breadcrumb.Divider>/</Breadcrumb.Divider>
					<Breadcrumb.Section active link>Quotes</Breadcrumb.Section>
				</Breadcrumb>
			) : (
				<Breadcrumb>
					<Breadcrumb.Section link onClick={() => this.props.updateStage('questions')}>Personal Info</Breadcrumb.Section>
					<Breadcrumb.Divider>/</Breadcrumb.Divider>
					<Breadcrumb.Section active link>Quotes</Breadcrumb.Section>
				</Breadcrumb>
			);
		}

    render() {
			return (
				<div id="quotesContainer">
					<div id="breadcrumbWrapper">{this.breadcrumbs()}</div>
					<h1 id="quotesTitle">YOUR BENEFITS</h1>
					{this.quoteItems()}
				</div>
			);
    }
}

const mapStateToProps = (state) => ({
	quotes: state.app.insuranceQuotes,
	insuranceData: state.app.insuranceData
});

const mapDispatchToProps = (dispatch) => ({
	loadInsuranceQuotes: (token) => dispatch(Actions.fetchAllInsuranceQuotes(token)),
	generateInsuranceQuotes: () => dispatch(Actions.generateInsuranceQuotes())
});

export default connect(mapStateToProps, mapDispatchToProps)(QuotesContainer);

