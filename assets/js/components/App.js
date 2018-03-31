import React, { Component } from 'react';
import Menu from './Menu';

class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className='container'>
        <Menu />
        {children}
      </div>
    );
  }
}

export default App;
