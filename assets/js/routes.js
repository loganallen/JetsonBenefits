import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/App';
import Home from './components/Home';

// Component 'Home' in route gives error
const routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/home' component={Home} />
    </Switch>
  </BrowserRouter>
);

export default routes;
