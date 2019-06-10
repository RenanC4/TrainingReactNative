import {
  ACTION_MATERIAL_SUCCESS,
  ACTION_MATERIAL_CREATE_SUCCESS,
  ACTION_MATERIAL_REQUESTED_ERROR,
  ACTION_MATERIAL_REQUEST,
} from '../../actions/workOrder/material';

import Immutable from 'seamless-immutable';

const initialState = Immutable({
  error: null,
  data: null,
  loading: false,

});

export default function material(state = initialState, action) {
  switch (action.type) {
    case ACTION_MATERIAL_REQUEST: {
      return state.merge({
        error: null,
        loading: action.payload,
      })
    }
    case ACTION_MATERIAL_REQUESTED_ERROR: {
      return state.merge({
        loading: false,
        error: null,
        data:null,
      });
    }
    case ACTION_MATERIAL_SUCCESS: {
      return state.merge({
        data: action.payload.data,
        error: null,
        loading: false
      });
    }
    case ACTION_MATERIAL_CREATE_SUCCESS: {
      return state.merge({
        error: null,
        loading: false,
      });
    }
    default: {
      return state.merge({
        loading: false,
        error: null,
      });
    }
  }
}

export function getMaterial(state) {
  return state.material.data;
}


export function isLoading(state) {
  return state.material.loading;
}



