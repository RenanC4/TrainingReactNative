import {
  ACTION_RESET_PASSWORD_REQUESTED,
  ACTION_RESET_PASSWORD_ERROR,
  ACTION_RESET_PASSWORD_SUCCESS,
} from '../../actions/user/resetPassword';

import Immutable from 'seamless-immutable';

const initialState = Immutable({
  loading: false,
  status: {}
});

export default function resetPassword(state = initialState, action) {
  switch (action.type) {
    case ACTION_RESET_PASSWORD_REQUESTED: {
      return state.merge({
        loading: action.payload,
      })
    }

    case ACTION_RESET_PASSWORD_SUCCESS: {
      return state.merge({
        status: action.payload
      });
    }

    case ACTION_RESET_PASSWORD_ERROR: {
      return state.merge({
        status: action.payload,
      });
    }

    default: {
      return state;
    }
  }
}

export function sendPasswordReset(state) {
  return state.resetPassword;
}
