import React from 'react';
import Menu from './Menu';

class App extends React.Component {
  render() {
    const { children } = this.props;
    console.log('hi');

    return (
      <div className='container'>
        <Menu />
        {children}
      </div>
    );
  }
}

export default App;
