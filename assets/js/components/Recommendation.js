import React from 'react';

import Navigation from './Navigation';
import QuestionsContainer from './QuestionsContainer';
import QuotesContainer from './QuotesContainer';

class Recommendation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Navigation />
                <div></div>
            </div>
        );
    }
}

export default Recommendation;
