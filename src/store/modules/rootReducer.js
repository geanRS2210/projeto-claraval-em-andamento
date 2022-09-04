import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import operatorReducer from './operator/reducer';
import specialtyReducer from './specialty/reducer';

export default combineReducers({
  auth: authReducer,
  operator: operatorReducer,
  specialty: specialtyReducer,
});
