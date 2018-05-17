/**
 * App.js: the wrapper component for the React website
 */
import React from 'react';
import { connect } from 'react-redux';

import Actions from '../actions';

class App extends React.Component {

  componentWillMount() {
    // listen for window resize and update deviceWidth in store
    window.addEventListener('resize', this.props.emitDeviceWidthUpdate);
  }
  
  componentWillUnmount() {
    // remove listener when unmounted
    window.removeEventListener('resize', this.props.emitDeviceWidthUpdate);
  }

  render() {
    const { children } = this.props;

    return (
      <div id='containerWrapper' className={this.props.menuTheme}>
        <div className='container'>
          {children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  menuTheme: state.app.menuTheme
});

const mapDispatchToProps = (dispatch) => ({
  emitDeviceWidthUpdate: () => dispatch(Actions.emitDeviceWidthUpdate())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
