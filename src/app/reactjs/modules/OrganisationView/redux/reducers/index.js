import { combineReducers } from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as posts} from "../../modules/PostsOrganisation/index";
import {reducer as reviews} from "../../modules/ReviewsOrganisation/index";

const rootReducer = combineReducers({
  routing,
  posts,
  reviews
});

console.log("Root reducer from reducers: ",rootReducer)
export default rootReducer;
