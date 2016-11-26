import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import configureStore from './redux/configureStore';
import routes from './routes';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { hashHistory, useRouterHistory  } from 'react-router';
import { createHashHistory } from 'history'
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

// Apply the middleware to the store
const middleware = routerMiddleware(hashHistory);

const store = configureStore(middleware);
const history = syncHistoryWithStore(appHistory, store)

// console.log("Store: ", store)

render(
    <Root history={history} store={store} routes={routes} debug={false} />,
    document.getElementById('organisation_view') 
);