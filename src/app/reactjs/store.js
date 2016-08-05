import { syncHistory, routeReducer } from 'react-router-redux'
import { organisations } from './reducers'

import thunk from 'redux-thunk';
import { applyMiddleware, createStore, combineReducers  } from 'redux'
import { reducer as formReducer } from 'redux-form';
import createHistory from 'history/lib/createHashHistory'

export const history = createHistory({
    queryKey: false
});

const reducer = combineReducers(Object.assign({}, { 
        organisations
    }, {
        routing: routeReducer
    }, {
        form: formReducer     
    })
)

const reduxRouterMiddleware = syncHistory(history)

const logStateMiddleware = ({dispatch, getState}) => next => action => {
    console.log(action.type, getState())
    next(action)
}

const store = createStore(reducer, applyMiddleware(
    thunk, reduxRouterMiddleware
));

export default store
