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
import { isAuthenticated } from '../auth';

import '../../css/quotes.css';

class QuotesContainer extends React.Component {
    constructor(props) {
			super(props);
		}
		
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
			// TODO: Render nothing if the quote item is incomplete
			let quotes = Object.keys(this.props.quotes).map(insuranceType => (
				<QuoteItem
					key={insuranceType}
					insuranceType={insuranceType}
					insuranceData={this.props.insuranceData[insuranceType]}
					quote={this.props.quotes[insuranceType]}
					userData={this.props.userData}
					isMobile={this.props.isMobile}
					updateUserData={this.props.updateUserData}
					updateInsuranceData={this.props.updateInsuranceData}
					saveInsuranceData={this.props.saveInsuranceData}
					loadInsuranceQuote={this.props.loadInsuranceQuote}
					generateInsuranceQuotes={this.props.generateInsuranceQuotes}
					onCoverageClick={this.onCoverageClick}
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

