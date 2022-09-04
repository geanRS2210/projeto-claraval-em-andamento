import * as types from '../types';

const initialState = {
  loadingIn: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SPECIALTY_SUCCESS: {
      console.log('cheguei no sucesso');
      const newState = { ...initialState };
      newState.loadingIn = false;
      return newState;
    }

    case types.SPECIALTY_FAILURE: {
      const newState = { ...initialState };
      newState.loadingIn = false;
      return newState;
    }

    case types.SPECIALTY_REQUEST: {
      const newState = { ...initialState };
      newState.loadingIn = true;
      return newState;
    }

    default: {
      return state;
    }
  }
}
