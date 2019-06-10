import {
  ACTION_ATTACHMENTS_DOWNLOAD_SUCCESS,
  ACTION_ATTACHMENTS_SUCCESS,
  ACTION_ATTACHMENTS_CREATE_SUCCESS,
  ACTION_ATTACHMENTS_REQUESTED_ERROR,
  ACTION_ATTACHMENTS_REQUEST,
} from '../../actions/workOrder/attachments';

import Immutable from 'seamless-immutable';

const initialState = Immutable({
  error: null,
  data: null,
  loading: false,
  downloadData:null

});

export default function attachments(state = initialState, action) {
  switch (action.type) {
    case ACTION_ATTACHMENTS_REQUEST: {
      return state.merge({
        error: null,
        loading: action.payload,
      })
    }
    case ACTION_ATTACHMENTS_REQUESTED_ERROR: {
      return state.merge({
        loading: false,
        error: null,
        data:null,
      });
    }
    case ACTION_ATTACHMENTS_SUCCESS: {
      return state.merge({
        data: action.payload.data,
        error: null,
        loading: false
      });
    }
    case ACTION_ATTACHMENTS_CREATE_SUCCESS: {
      return state.merge({
        error: null,
        loading: false,
      });
    }
    case ACTION_ATTACHMENTS_DOWNLOAD_SUCCESS: {
      return state.merge({
        downloadData: action.payload.data,
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

export function getAttachment(state) {
  return state.attachments.data;
}

export function getAttachmentToDownload(state) {
  return state.attachments.downloadData;
}


export function isLoading(state) {
  return state.attachments.loading;
}



