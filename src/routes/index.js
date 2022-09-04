import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';
import home from '../pages/Home';
import window from '../pages/window';
import Login from '../pages/Login';
import operator from '../pages/operator';
import patient from '../pages/patient';
import patientRegister from '../pages/patientRegister';
import operatorRegister from '../pages/operatorRegister';
import specialtyRegister from '../pages/specialtyRegister';
import specialty from '../pages/specialty';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/patient" component={patient} />
      <MyRoute exact path="/" component={home} isClosed />
      <MyRoute exact path="/login" component={Login} />
      <MyRoute exact path="/window" component={window} />
      <MyRoute
        exact
        path="/operator/:id/edit"
        component={operatorRegister}
        isClosed
      />
      <MyRoute
        exact
        path="/operator/:id/delete"
        component={operatorRegister}
        isClosed
      />
      <MyRoute exact path="/operator" component={operator} isClosed />
      <MyRoute
        exact
        path="/operatorRegister"
        component={operatorRegister}
        isClosed
      />
      <MyRoute
        exact
        path="/patientRegister"
        component={patientRegister}
        isClosed
      />
      <MyRoute exact path="/specialty" component={specialty} isClosed />
      <MyRoute
        exact
        path="/specialtyRegister"
        component={specialtyRegister}
        isClosed
      />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
