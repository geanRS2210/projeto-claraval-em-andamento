import * as types from '../types';

const initialState = {
  loadingIn: false,
  id: undefined,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case types.OPERATOR_SUCCESS: {
      const newState = { ...initialState };
      newState.loadingIn = false;
      return newState;
    }

    case types.OPERATOR_FAILURE: {
      const newState = { ...initialState };
      newState.loadingIn = false;
      return newState;
    }

    case types.OPERATOR_REQUEST: {
      const newState = { ...initialState };
      newState.loadingIn = true;
      return newState;
    }
    case types.ID_REQUEST: {
      const newState = { ...initialState };
      newState.id = action.payload.id;
      return newState;
    }
    case types.OPERATOR_UPDATE_SUCCESS: {
      const newState = { ...initialState };
      newState.loadingIn = false;
      return newState;
    }
    case types.OPERATOR_UPDATE_FAILURE: {
      const newState = { ...initialState };
      newState.loadingIn = false;
      return newState;
    }

    default: {
      return state;
    }
  }
}
