import React, {Component} from "react"
import { render } from "react-dom"
import { Router, Route, IndexRoute, IndexRedirect, useRouterHistory, browserHistory } from 'react-router'
import { createHashHistory } from 'react-router/node_modules/history'
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
let reducer = combineReducers(reducers)
let store = finalCreateStore(reducer)

/////////////////
// IN PRODUCTION USE browserHistory instead of appHistory: https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md
////////////////

class StudioOrganisation extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={appHistory}>
          <Route path="/" component={StudioOrganisationPanel}>
            <IndexRoute component={StudioOrganisationPanel}/>
            {/* HARDCORE default path - Definitely change */}
            <IndexRedirect to="/2" component={StudioOrganisationPanel}/> 
            <Route path=":orgId" component={StudioOrganisationPanel}/>
            <Route path=":orgId/:requestId" component={StudioOrganisationPanel}/>
          </Route>
        </Router>
      </Provider>
    )
  }
}

render(<StudioOrganisation/>, document.getElementById('studio_organisation'))