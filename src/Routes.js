import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Home, Edit, ErrorNotFound, Message, Preview } from 'Pages';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Home/> }/>
        <Route path="/edit/:id" component={Edit} />
        <Route path="/message/:id" component={Message} />
        <Route path="/preview/:id" component={Preview} />

        <Route component={ErrorNotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
