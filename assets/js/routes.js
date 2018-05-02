/**
 * routes.js: creates the routes for our application
 * 1. Home --> `/` or `/home`
 * 2. Recommendation --> `/recommendation`
 */

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import base components to conditionally render
import Home from './components/Home';
import Recommendation from './components/Recommendation';

const routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/home' component={Home} />
      <Route path='/recommendation' component={Recommendation} />
    </Switch>
  </BrowserRouter>
);

export default routes;
