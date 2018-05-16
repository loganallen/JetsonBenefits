/**
 * QuotesContainer.js: This component displays the recommended quotes for the user. It serves
 * up at most three [QuoteItem.js] components corresponding to specific insurance types
 * (HEALTH, LIFE, or DISABILITY). This component is contained within the [Recommendation.js] component.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb } from 'semantic-ui-react';	

import QuoteItem from './sub_components/QuoteItem';
import Actions from '../actions';
import { isAuthenticated } from '../auth';

import '../../css/quotes.css';

class QuotesContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	// Fetch & load the insurance quotes & data for the current user
	componentWillMount() {
		if (isAuthenticated()) {
			this.props.loadAllInsuranceQuotes();
			this.props.loadAllInsuranceData();
		} else {
			this.props.generateInsuranceQuotes();
		}
	}

	onCoverageClick = (data) => {
		// TODO: Link to insurance carrier
		console.log('Linking to insurance carrier for this quote...');
	}

	quoteItems = () => {
		let quotes = Object.keys(this.props.quotes).map(insuranceType => {
			let quote = this.props.quotes[insuranceType];
			if (Object.keys(quote).length === 0) return <div></div>;

			let insuranceData = this.props.insuranceData[insuranceType];
			return (
				<QuoteItem
					key={insuranceType}
					insuranceType={insuranceType}
					insuranceData={insuranceData}
					quote={quote}
					userData={this.props.userData}
					isMobile={this.props.isMobile}
					updateUserData={this.props.updateUserData}
					updateInsuranceData={this.props.updateInsuranceData}
					saveInsuranceData={this.props.saveInsuranceData}
					loadInsuranceQuote={this.props.loadInsuranceQuote}
					generateInsuranceQuotes={this.props.generateInsuranceQuotes}
					onCoverageClick={this.onCoverageClick}
				/>
			);
		});

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
	userData: state.app.userData,
	insuranceData: state.app.insuranceData
});

const mapDispatchToProps = (dispatch) => ({
	updateUserData: (key, value) => dispatch(Actions.updateUserData(key, value)),
	updateInsuranceData: (type, key, value) => dispatch(Actions.updateInsuranceData(type, key, value)),
	saveInsuranceData: (insuranceType) => dispatch(Actions.postInsuranceInfo(insuranceType)),
	loadAllInsuranceData: () => dispatch(Actions.fetchAllInsuranceInfo()),
	loadInsuranceQuote: (insuranceType) => dispatch(Actions.fetchInsuranceQuote(insuranceType)),
	loadAllInsuranceQuotes: () => dispatch(Actions.fetchAllInsuranceQuotes()),
	generateInsuranceQuotes: () => dispatch(Actions.generateInsuranceQuotes())
});

export default connect(mapStateToProps, mapDispatchToProps)(QuotesContainer);

