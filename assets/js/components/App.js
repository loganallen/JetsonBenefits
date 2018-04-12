import React from 'react';
import Menu from './Menu';

class App extends React.Component {
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
