import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {PostsOrganisationPanel} from './modules/PostsOrganisation/index';
import {ReviewsOrganisationPanel} from "./modules/ReviewsOrganisation/index";

export default (
<Route path="/">
    <IndexRoute component={PostsOrganisationPanel}/>
    <Route path="reviews" component={ReviewsOrganisationPanel}/>
</Route>);