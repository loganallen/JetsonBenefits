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
    // listen for reload, or leaving page events --> makes sure user doesn't lose changes on accident
    window.addEventListener('beforeunload', this.onUnload);
  }
  
  componentWillUnmount() {
    // remove listeners when unmounted
    window.removeEventListener('resize', this.props.emitDeviceWidthUpdate);
    window.removeEventListener('beforeunload', this.onUnload);
  }

  // Note: this syntax automatically binds the `this` context
  onUnload = (event) => {
    const message = 'Are you sure you want to abondon you unsaved changes?';
    event.returnValue = message;
    return message;
  }

  render() {
    const { children } = this.props;

    return (
      <div id='containerWrapper' className={this.props.menuTheme}>
        {children}
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
