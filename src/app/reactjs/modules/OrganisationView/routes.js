import React from 'react';
import { Route } from 'react-router';

import {PostsOrganisationPanel} from './modules/PostsOrganisation/index';
import {ReviewsOrganisationPanel} from "./modules/ReviewsOrganisation/index";

export default (
<Route path="/" component={PostsOrganisationPanel}>
    <Route name="Review" path="reviews" component={ReviewsOrganisationPanel}/>
</Route>);