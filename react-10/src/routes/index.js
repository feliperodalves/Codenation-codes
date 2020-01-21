import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';

const Routes = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/404" render={NotFound} />
      <Route path="*" render={() => <Redirect to="/404" />} />
    </Switch>
  </>
);

export default Routes;
