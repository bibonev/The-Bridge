import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';

import { Provider } from 'react-redux';

import store from './store';
import { history } from './store';

import OrganisationPanel from './components/OrganisationPanel';
import App from './components/app';

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={OrganisationPanel}>
                 <Route path="/customer/organisations/" component={App} />
            </Route>
        </Router>
    </Provider>
  ), document.getElementById('cont')
);