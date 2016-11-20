import React, {Component} from "react"
import { render } from "react-dom"
import { Router, Route, IndexRoute, IndexRedirect, useRouterHistory, hashHistory, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { createHashHistory } from 'history'
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"

import * as reducers from "./reducers"

import StudioOrganisationPanel from './containers/StudioOrganisationPanel';

let finalCreateStore = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

//let middlewares = [thunk];
// function configureStore(routerMiddleware, initialState) {
//   const store = compose(applyMiddleware(...middlewares, routerMiddleware))(createStore)(reducers, initialState);
//   return store;
// }
//const middleware = routerMiddleware(hashHistory);
const reducer = combineReducers(reducers)
const store = finalCreateStore(reducer)
//const store = configureStore(middleware);
//const history = syncHistoryWithStore(hashHistory, store);

/////////////////
// IN PRODUCTION USE browserHistory instead of appHistory: https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md
////////////////
// Fix the routers to work when changing manually the url to refresh!!! http://localhost:8000/studio/#/2 to http://localhost:8000/studio/#/11 manually
////////////////

// Change different components for each Route
class StudioOrganisation extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={appHistory}>
          <Route path="/" component={StudioOrganisationPanel}>
            <IndexRoute component={StudioOrganisationPanel}/>
            {/* HARDCODE default path - Definitely change */}
            <IndexRedirect to="/2" component={StudioOrganisationPanel}/> 
            <Route path=":orgId" component={StudioOrganisationPanel}/>
            <Route path=":orgId/:requestId" component={StudioOrganisationPanel}/>
            <Route path=":orgId/pending/:pendingId" component={StudioOrganisationPanel}/>
          </Route>
        </Router>
      </Provider>
    )
  }
}

render(<StudioOrganisation/>, document.getElementById('studio_organisation'))