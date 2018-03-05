import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';

var Hello = createReactClass ({
    render: function() {
        return (
            <div>
                <h1>Hello, Jetson Benefits!</h1>
                <p>More info to come...</p>
            </div>
        )
    }
})

ReactDOM.render(<Hello />, document.getElementById('container'))