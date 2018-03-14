import React from 'react';
import Menu from './Menu';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
        <Menu />
        {this.props.children}
      </div>
    );
  }
}

export default Container;
