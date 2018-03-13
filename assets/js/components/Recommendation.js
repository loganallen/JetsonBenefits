/*
[Recommendation] is the second main unique page, which contains the entire
recommendation engine and quote serving process. Serves the [QuestionsContainer]
and [QuotesContainer] components. Also contains the [Navigation] component.

Model filepath:
Controller filepath:
*/

import React from 'react';

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
            </div>
        );
    }
}

export default Recommendation;
