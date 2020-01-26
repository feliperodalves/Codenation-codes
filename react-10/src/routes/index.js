import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ContactList } from '../pages/ContactList';
import { NotFound } from '../pages/NotFound';
import { EditContact } from '../pages/EditContact';

const Routes = () => (
  <>
    <Switch>
      <Route exact path="/" component={ContactList} />
      <Route exact path="/edit" component={EditContact} />
      <Route path="/edit/:id" component={EditContact} />
      <Route exact path="/404" render={NotFound} />
      <Route path="*" render={() => <Redirect to="/404" />} />
    </Switch>
  </>
);

export default Routes;
