import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* OperatorRequest({ payload }) {
  const { user, password, level, id } = payload;
  console.log(id);
  if (id) {
    try {
      if (password) console.log('veio uma senha');
      const response = yield call(axios.put, `/operator/${id}`, {
        user,
        level,
        password: password || null,
      });
      yield put(actions.operatorUpdateSuccess(...response.data));

      history.back();
    } catch (e) {
      yield put(actions.operatorUpdateFailure());
      console.log(e);
    }
  } else {
    try {
      const response = yield call(axios.post, '/operator', {
        user,
        password,
        level,
      });
      yield put(actions.operatorSuccess({ ...response.data }));
      console.log(response.data);
      toast.success('Operador criado com sucesso!!');

      history.push('/operatorRegister');
    } catch (e) {
      console.log(e);
      toast.error('Email ou senha incorreto');
      yield put(actions.operatorFailure());
    }
  }
}

export default all([takeLatest(types.OPERATOR_REQUEST, OperatorRequest)]);
