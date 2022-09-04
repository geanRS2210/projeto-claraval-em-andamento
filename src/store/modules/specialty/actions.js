import * as types from '../types';

export function specialtyRequest(payload) {
  return {
    type: types.SPECIALTY_REQUEST,
    payload,
  };
}

export function specialtySuccess(payload) {
  return {
    type: types.SPECIALTY_SUCCESS,
    payload,
  };
}

export function specialtyFailure(payload) {
  return {
    type: types.SPECIALTY_FAILURE,
    payload,
  };
}
