import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';

let middlewares = [thunk];

// if (process.env.NODE_ENV === 'development') {
//   const createLogger = require(`redux-logger`);
//   const logger = createLogger({
//     collapsed: (getState, action) => action.type == "EFFECT_TRIGGERED" || action.type == "EFFECT_RESOLVED"
//   });
//   middlewares.push(logger);

  //const DevTools = require('../../containers/DevTools')
  //middlewares.push(DevTools.instrument());

  //middlewares.push(window.devToolsExtension ? window.devToolsExtension() : f => f)
// }

export default function configureStore(routerMiddleware, initialState) {
  const store = compose(applyMiddleware(...middlewares, routerMiddleware))(createStore)(rootReducer, initialState);
  return store;
}
