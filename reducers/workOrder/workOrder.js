import {
  ACTION_WORK_ORDER_LIST_SUCCESS,
  ACTION_WORK_ORDER_CREATE_SUCCESS,
  ACTION_WORK_ORDER_EDIT_SUCCESS,
  ACTION_WORK_ORDER_DETAIL_SUCCESS,
  ACTION_WORK_ORDER_REQUESTED_ERROR,
  ACTION_WORK_ORDER_REQUEST,
  ACTION_MY_GROUP_WORK_ORDER_LIST_SUCCESS,
  ACTION_REPORTED_BY_ME_WORK_ORDER_LIST_SUCCESS,
  ACTION_ALL_WORK_ORDER_LIST_SUCCESS,
  ACTION_WORK_ORDER_CREATE_MATERIAL_SUCCESS,
  ACTION_WORK_ORDER_CREATE_LABOR_SUCCESS,
  ACTION_WORK_ORDER_EMPTY,
  ACTION_WORK_ORDER_BY_DATE_FILTER
} from '../../actions/workOrder/workOrder';

import Immutable from 'seamless-immutable';

const initialState = Immutable({
  error: null,
  data: null,
  reportedByMeData: null,
  myGroupData: null,
  allData: null,
  selectedWorkOrder: null,
  loading: false,
  messageToast: '',
  createdWorkOrder: '',
  editedWorkOrder: '',
  workOrderDetail: '',
  myAssignmentsData: null,
  workOrdersByFilterDate: null,
});

export default function workOrder(state = initialState, action) {

  switch (action.type) {

    case ACTION_WORK_ORDER_REQUEST: {

      return state.merge({
        error: null,
        loading: action.payload,
        data: null
      })
    }

    case ACTION_WORK_ORDER_EMPTY: {

      return state.merge({
        error: null,
        data: null,
        reportedByMeData: null,
        myGroupData: null,
        allData: null,
        selectedWorkOrder: null,
        loading: false,
        messageToast: '',
        createdWorkOrder: '',
        editedWorkOrder: '',
        workOrderDetail: '',
        myAssignmentsData: null,
      })
    }

    case ACTION_WORK_ORDER_REQUESTED_ERROR: {
      return state.merge({
        messageToast: null,
        loading: false,
        error: null,
        data: null,
      });
    }

    case ACTION_WORK_ORDER_LIST_SUCCESS: {
      return state.merge({
        myAssignmentsData: action.payload.data,
        messageToast: null,
        data: action.payload.data,
        error: null,
        loading: false
      });
    }

    case ACTION_MY_GROUP_WORK_ORDER_LIST_SUCCESS: {
      return state.merge({
        messageToast: null,
        myGroupData: action.payload.data,
        error: null,
        loading: false
      });
    }

    case ACTION_REPORTED_BY_ME_WORK_ORDER_LIST_SUCCESS: {
      return state.merge({
        messageToast: null,
        reportedByMeData: action.payload.data,
        error: null,
        loading: false
      });
    }
    case ACTION_ALL_WORK_ORDER_LIST_SUCCESS: {
      return state.merge({
        messageToast: null,
        allData: action.payload.data,
        error: null,
        loading: false
      });
    }

    case ACTION_WORK_ORDER_DETAIL_SUCCESS: {
      return state.merge({
        messageToast: null,
        selectedWorkOrder: action.payload,
        error: null,
        loading: false,
      });
    }
    case ACTION_WORK_ORDER_CREATE_MATERIAL_SUCCESS: {
      return state.merge({
        messageToast: 'Material Created',
        error: null,
        loading: false,
      });
    }

    case ACTION_WORK_ORDER_CREATE_LABOR_SUCCESS: {
      return state.merge({
        messageToast: 'Labor Created',
        status: 1,
        loading: false,
      });
    }

    case ACTION_WORK_ORDER_CREATE_SUCCESS: {
      return state.merge({
        messageToast: 'Work Order Created',
        selectedWorkOrder: action.payload,
        createdWorkOrder: action.payload,
        error: null,
        loading: false,
      });
    }
    case ACTION_WORK_ORDER_EDIT_SUCCESS: {
      return state.merge({
        messageToast: 'Work Order Updated',
        loading: false,
        error: null,
      });
    }
    case ACTION_WORK_ORDER_BY_DATE_FILTER: {
      return state.merge({
        workOrdersByFilterDate: action.payload,
        loading: false,
        error: null,
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

export function getWorkOrders(state) {
  return state.workOrder.data;
}

export function getMyAssignmentsDataWorkOrders(state) {
  return state.workOrder.myAssignmentsData;
}

export function getReportedByMeWorkOrders(state) {
  return state.workOrder.reportedByMeData;
}

export function getMyGroupWorkOrders(state) {
  return state.workOrder.myGroupData;
}

export function getAllWorkOrders(state) {
  return state.workOrder.allData;
}

export function getSelectedWorkOrder(state) {
  return state.workOrder.selectedWorkOrder;
}

export function isLoading(state) {
  return state.workOrder.loading;
}

export function tostMessage(state) {
  return state.workOrder.messageToast;
}


export function getCreatedWorkOrder(state) {
  return state.workOrder.createdWorkOrder;
}

export function getWorkOrderFilteredByDate(state) {
  return state.workOrder.workOrdersByFilterDate;
}

