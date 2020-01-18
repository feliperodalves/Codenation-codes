import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ThreadList } from '../pages/ThreadList';
import { ThreadDetail } from '../pages/ThreadDetail';
import { NotFound } from '../pages/NotFound';

const Routes = () => (
  <>
    <Switch>
      <Route exact path="/" component={ThreadList} />
      <Route path="/thread/:thread_slug" component={ThreadDetail} />
      <Route exact path="/404" component={NotFound} />
      <Route path="*" render={() => <Redirect to="/404" />} />
    </Switch>
  </>
);

export default Routes;
