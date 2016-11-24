// import React, {Component} from "react"
// import { render } from "react-dom"
// import {
//   createStore,
//   compose,
//   applyMiddleware,
//   combineReducers,
// } from "redux"
// import { Provider } from "react-redux"
// import thunk from "redux-thunk"

// import * as reducers from "./reducers"

// import PostsOrganisationPanel from './containers/PostsOrganisationPanel';

// let finalCreateStore = compose(
//   applyMiddleware(thunk),
//   window.devToolsExtension ? window.devToolsExtension() : f => f
// )(createStore)
// let reducer = combineReducers(reducers)
// let store = finalCreateStore(reducer)


// class PostsOrganisation extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <PostsOrganisationPanel />
//       </Provider>
//     )
//   }
// }

// render(<PostsOrganisation/>, document.getElementById('posts_organisation'))

export {default as PostsOrganisationPanel} from './containers/PostsOrganisationPanel';
export {default as reducer} from './reducers';

console.log(reducer)