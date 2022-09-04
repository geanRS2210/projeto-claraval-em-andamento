import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import operator from './operator/sagas';
import specialty from './specialty/sagas';

export default function* rootSaga() {
  return yield all([auth, operator, specialty]);
}
