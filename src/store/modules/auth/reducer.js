import * as types from '../types';

const initialState = {
  logedIn: false,
  token: false,
  user: '',
  level: '',
  loadingIn: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const newState = { ...initialState };
      newState.logedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.user;
      newState.level = action.payload.level;
      console.log(newState.level);
      newState.loadingIn = false;
      return newState;
    }

    case types.LOGIN_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    case types.LOGIN_REQUEST: {
      const newState = { ...initialState };
      newState.loadingIn = true;
      return newState;
    }

    default: {
      return state;
    }
  }
}
