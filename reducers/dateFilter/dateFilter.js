import {
  ACTION_FILTER_SELECTED_DATE
} from '../../actions/dateFilter/dateFilter';

import Immutable from 'seamless-immutable';

const initialState = Immutable({

  data: null,

});

export default function dateFilter(state = initialState, action) {

  switch (action.type) {

    case ACTION_FILTER_SELECTED_DATE: {

      return state.merge({
        data: action.payload,
      })
    }

    default: {
      return state.merge({
        loading: null,
      });
    }
  }
}


export function getFilterSelected(state) {
  return state.dateFilter;
}

