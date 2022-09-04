import * as types from '../types';

export function operatorRequest(payload) {
  return {
    type: types.OPERATOR_REQUEST,
    payload,
  };
}

export function operatorSuccess(payload) {
  return {
    type: types.OPERATOR_SUCCESS,
    payload,
  };
}

export function operatorFailure(payload) {
  return {
    type: types.OPERATOR_FAILURE,
    payload,
  };
}
export function idRequest(payload) {
  return {
    type: types.ID_REQUEST,
    payload,
  };
}
export function operatorUpdateSuccess(payload) {
  return {
    type: types.OPERATOR_UPDATE_SUCCESS,
    payload,
  };
}
export function operatorUpdateFailure(payload) {
  return {
    type: types.OPERATOR_UPDATE_FAILURE,
    payload,
  };
}
