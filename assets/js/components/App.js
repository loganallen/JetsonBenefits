import React from 'react';
import Menu from './Menu';

import { connect } from 'react-redux';

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
