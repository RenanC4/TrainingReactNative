import {
  ACTION_USER_LOGIN_REQUESTED,
  ACTION_USER_LOGIN_SUCCESS,
  ACTION_USER_LOGIN_ERROR,
  ACTION_USER_LOGOFF,
} from '../../actions/user/user';

import Immutable from 'seamless-immutable';

const initialState = Immutable({
  isLogged: false,
  isOnRequest: false,
  error: '',
  data: {},
});

export default function user(state = initialState, action) {

  switch (action.type) {
    case ACTION_USER_LOGIN_REQUESTED: {
      return state.merge({
        isOnRequest: action.payload,
        error: null,
      })
    }

    case ACTION_USER_LOGIN_SUCCESS: {
      return state.merge({
        isLogged: true,
        isOnRequest: false,
        data: action.payload,
      });
    }

    case ACTION_USER_LOGIN_ERROR: {
      return state.merge({
        isLogged: false,
        error: action.payload,
        isOnRequest: false,
      })
    }
    case ACTION_USER_LOGOFF: {
      return state.merge({
        isLogged: action.payload,
        error: action.payload,
        isOnRequest: action.payload,
        data:action.payload,
      })
    }

    default: {
      return state;
    }
  }
}

export function getUserData(state) {
  return state.user;
}

export function isOnRequest(state) {
  return state.user.isOnRequest;
}

