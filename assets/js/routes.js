import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Home from './components/Home';

// Component 'Home' in route gives error
const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/home' component={Home} />
  </Route>
);

export default routes;
