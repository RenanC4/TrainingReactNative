import {
  ACTION_LABOR_SUCCESS,
  ACTION_LABOR_CREATE_SUCCESS,
  ACTION_LABOR_REQUESTED_ERROR,
  ACTION_LABOR_REQUEST,
} from '../../actions/workOrder/labor';

import Immutable from 'seamless-immutable';

const initialState = Immutable({
  error: null,
  data: null,
  loading: false,
  message:'',
});

export default function labor(state = initialState, action) {
  switch (action.type) {
    case ACTION_LABOR_REQUEST: {
      return state.merge({
        error: null,
        message:'',
        loading: action.payload,
      })
    }
    case ACTION_LABOR_REQUESTED_ERROR: {
      return state.merge({
        loading: false,
        error: null,
        data:null,
        message:'',
      });
    }
    case ACTION_LABOR_SUCCESS: {
      return state.merge({
        data: action.payload.data,
        error: null,
        loading: false,
        message:''
      });
    }
    case ACTION_LABOR_CREATE_SUCCESS: {
      return state.merge({
        data: action.payload.data,
        error: null,
        loading: false,
        message:'Labor Created'
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

export function getLabor(state) {
  return state.labor.data;
}


export function isLoading(state) {
  return state.labor.loading;
}

export function messages(state) {
  return state.labor.message;
}



