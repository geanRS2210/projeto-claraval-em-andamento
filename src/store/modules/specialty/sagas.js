import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* SpecialtyRequest({ payload }) {
  try {
    const { doctor, address, number, telephone, notes, specialty } = payload;
    const response = yield call(axios.post, '/specialty', {
      doctor,
      address,
      number,
      telephone,
      notes,
      specialty,
    });
    yield put(actions.specialtySuccess({ ...response.data }));
    console.log(response.data);
    toast.success('Cadastro médico feito com sucesso!!');

    yield history.push('/specialtyRegister');
  } catch (e) {
    console.log(e);
    toast.error('Ocorreu um erro!!');
    yield put(actions.specialtyFailure());
  }
}
export default all([takeLatest(types.SPECIALTY_REQUEST, SpecialtyRequest)]);
