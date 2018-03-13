import React from 'react';
import Navigation from './Navigation';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
        <Navigation />
        {this.props.children}
      </div>
    );
  }
}

export default Container;
