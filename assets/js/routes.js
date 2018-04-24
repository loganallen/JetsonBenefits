import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Test from './components/Test';
import Home from './components/Home';
import Recommendation from './components/Recommendation';

// Component 'Home' in route gives error
const routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/home' component={Home} />
      <Route path='/recommendation' component={Recommendation} />
      <Route path='/test' component={Test} />
    </Switch>
  </BrowserRouter>
);

export default routes;
