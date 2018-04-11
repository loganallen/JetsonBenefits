/*
[Recommendation] is the second main unique page, which contains the entire
recommendation engine and quote serving process. Serves the [QuestionsContainer]
and [QuotesContainer] components. Also contains the [Navigation] component.

Model filepath:
Controller filepath:
*/

import React from 'react';
import { connect } from 'react-redux';

import QuestionsContainer from './QuestionsContainer';
import QuotesContainer from './QuotesContainer';
import Sidebar from './sub_components/Sidebar';

class Recommendation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 'questions'
        };
    }

    mainContent = (stage) => {
        return (stage == 'questions') ? <QuestionsContainer /> : <QuotesContainer />;
    }

    onPurchaseClick = () => {
        this.setState({
            stage: 'quotes'
        });
    }

    render() {
        return (
            <div>
                <Sidebar />
                {this.mainContent(this.state.stage)}
                {this.state.stage == 'questions' && <button type='button' 
                 id='homeS2B1' onClick={this.onPurchaseClick}>
                    Purchase
                </button>}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state
});

export default connect(mapStateToProps, null)(Recommendation);
