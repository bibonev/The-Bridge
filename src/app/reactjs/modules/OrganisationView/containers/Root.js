import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
// import DevTools from './DevTools';
import {Router} from 'react-router';
import {connect} from 'react-redux';

class Root extends Component {

  render() {
    const { store, history, debug, routes } = this.props;
    return (
      <Provider store={store}>
        <div>
          <Router history={history}>
            {routes}
          </Router>
          {/*debug && <DevTools />*/}
        </div>
      </Provider>);
  }
}

export default Root;
