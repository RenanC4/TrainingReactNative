import {
  ACTION_CRAFT_LOOKUP_REQUESTED,
  ACTION_CRAFT_LOOKUP_REQUESTED_SUCCESS,
  ACTION_CRAFT_LOOKUP_REQUESTED_ERROR,
} from '../../actions/lookup/lookup';

import Immutable from 'seamless-immutable';

const initialState = Immutable({
  error: null,
  data: {},
  loading: false
});

export default function craftLookup(state = initialState, action) {
  switch (action.type) {
    case ACTION_CRAFT_LOOKUP_REQUESTED: {
      return state.merge({
        error: null,
        data: action.payload,
        loading: action.payload,
      })
    }
    case ACTION_CRAFT_LOOKUP_REQUESTED_SUCCESS: {
      return state.merge({
        data: action.payload.data,
        error: null,
        loading: false,
      });
    }
    case ACTION_CRAFT_LOOKUP_REQUESTED_ERROR: {
      return state.merge({
        error: action.payload,
        loading: false,
      });
    }
    default: {
      return state;
    }
  }
}
export function doCraftLookup(state) {
  return state.craftLookup.data;
}


