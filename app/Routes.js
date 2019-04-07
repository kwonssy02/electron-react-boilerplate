import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import Driving from './components/Driving';
import Recovering from './components/Recovering';
import IgnOff from './components/IgnOff';
import IgnOn from './components/IgnOn';
import Uploading from './components/Uploading';

export default () => (
  <App>
    <Switch>
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route path={routes.HOME} component={HomePage} />
      <Route path={routes.DRIVING} component={Driving} />
      <Route path={routes.RECOVERING} component={Recovering} />
      <Route path={routes.IGNOFF} component={IgnOff} />
      <Route path={routes.IGNON} component={IgnOn} />
      <Route path={routes.UPLOADING} component={Uploading} />
    </Switch>
  </App>
);
