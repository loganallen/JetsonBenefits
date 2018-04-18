import React from 'react';
import { connect } from 'react-redux';

import Menu from './Menu';

class App extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div id='containerWrapper' className={this.props.menuTheme}>
        <div className='container'>
          <Menu />
          {children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  menuTheme: state.app.menuTheme
});

export default connect(mapStateToProps, null)(App);
