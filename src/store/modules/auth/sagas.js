import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* LoginRequest({ payload }) {
  try {
    const { user, password } = payload;
    console.log(user, password);
    const response = yield call(axios.post, '/login', { user, password });
    yield put(actions.loginSuccess({ ...response.data }));
    console.log(response.data);
    const { token } = response.data;
    toast.success('Operador logado com sucesso!!');

    axios.defaults.headers.authorization = `Bearer ${token}`;

    history.push('/patient');
  } catch (e) {
    console.log(e);
    toast.error('Email ou senha incorreto');
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(types.LOGIN_REQUEST, LoginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
