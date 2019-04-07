import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import Driving from './components/Driving';
import Recovering from './components/Recovering';

export default () => (
  <App>
    <Switch>
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route path={routes.HOME} component={HomePage} />
      <Route path={routes.DRIVING} component={Driving} />
      <Route path={routes.RECOVERING} component={Recovering} />
    </Switch>
  </App>
);
