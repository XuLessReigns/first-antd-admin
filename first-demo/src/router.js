import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';


import Users from "./routes/Users.js";

import Index from "./routes/index";

import Test from './routes/test';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/users" component={Users} />
      <Route path="/index" component={Index} />
      <Route path="/test" component={Test} />
    </Router>
  );
}

export default RouterConfig;
