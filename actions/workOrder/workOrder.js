import WorkOrderService from '../../services/workOrder/workOrder'
import LaborService from "../../services/workOrder/labor";

export const ACTION_WORK_ORDER_LIST_SUCCESS = 'work-order-list-success';
export const ACTION_WORK_ORDER_CREATE_SUCCESS = 'work-order-create-success';
export const ACTION_WORK_ORDER_EDIT_SUCCESS = 'work-order-edit-success';
export const ACTION_WORK_ORDER_DETAIL_SUCCESS = 'work-order-detail-success';
export const ACTION_WORK_ORDER_CREATE_MATERIAL_SUCCESS = 'work-order-create-material-success';
export const ACTION_WORK_ORDER_CREATE_LABOR_SUCCESS = 'work-order-create-labor-success';


export const ACTION_MY_GROUP_WORK_ORDER_LIST_SUCCESS = 'my-group-work-order-list-success';
export const ACTION_REPORTED_BY_ME_WORK_ORDER_LIST_SUCCESS = 'reported-by-me-work-order-list-success';
export const ACTION_ALL_WORK_ORDER_LIST_SUCCESS = 'all-work-order-list-success';

export const ACTION_WORK_ORDER_EMPTY = 'work-order-empty';


export const ACTION_WORK_ORDER_BY_DATE_FILTER = 'work-order-by-date-filter';


export const ACTION_WORK_ORDER_REQUESTED_ERROR = 'work-order-requested-error';
export const ACTION_WORK_ORDER_REQUEST = 'work-order-request';


export function emptyWorkOrder() {

  return async (dispatch) => {
    dispatch({
      type: ACTION_WORK_ORDER_EMPTY, payload: null
    });
  }
}


export function workOrderListRequest(token, text) {

  return async (dispatch) => {
    try {

      dispatch({
        type: ACTION_WORK_ORDER_REQUEST, payload: true
      });

      const workOrderList = await WorkOrderService.getWorkOrders(token, text);

      dispatch({
        type: ACTION_WORK_ORDER_REQUEST, payload: false
      });

      dispatch({
        type: ACTION_WORK_ORDER_LIST_SUCCESS, payload: workOrderList
      });

    } catch (err) {
      console.log(err)
      dispatch({
        type: ACTION_WORK_ORDER_REQUESTED_ERROR, payload: err
      });
    }
  }
}

export function workOrderListRequestByDateFilter(token, date) {

  return async (dispatch) => {
    try {

      dispatch({
        type: ACTION_WORK_ORDER_REQUEST, payload: true
      });

    const workOrderByFilter = await WorkOrderService.getWorkOrdersByDate(token, date);

      dispatch({
        type: ACTION_WORK_ORDER_REQUEST, payload: false
      });

      dispatch({
        type: ACTION_WORK_ORDER_BY_DATE_FILTER, payload: workOrderByFilter
      });

    } catch (err) {
      console.log(err)
      dispatch({
        type: ACTION_WORK_ORDER_REQUESTED_ERROR, payload: err
      });
    }
  }
}


export function myGroupWorkOrderListRequest(token, text) {
  return async (dispatch) => {
    try {

      dispatch({
        type: ACTION_WORK_ORDER_REQUEST, payload: true
      });

      const myGroupWorkOrderList = await WorkOrderService.getMyGroupWorkOrders(token, text);


      dispatch({
        type: ACTION_WORK_ORDER_REQUEST, payload: false
      });

      dispatch({
        type: ACTION_MY_GROUP_WORK_ORDER_LIST_SUCCESS, payload: myGroupWorkOrderList
      });

    } catch (err) {
      console.log(err)
      dispatch({
        type: ACTION_WORK_ORDER_REQUESTED_ERROR, payload: err
      });
    }
  }
}

export function reportedByMeWorkOrderListRequest(token, text) {
  return async (dispatch) => {
    try {

      dispatch({
        type: ACTION_WORK_ORDER_REQUEST, payload: true
      });

      const reportedByMeWorkOrderList = await WorkOrderService.getReportedByMeWorkOrders(token, text);

      dispatch({
        type: ACTION_WORK_ORDER_REQUEST, payload: false
      });

      dispatch({
        type: ACTION_REPORTED_BY_ME_WORK_ORDER_LIST_SUCCESS, payload: reportedByMeWorkOrderList
      });

    } catch (err) {
      console.log(err)
      dispatch({
        type: ACTION_WORK_ORDER_REQUESTED_ERROR, payload: err
      });
    }
  }
}

export function allWorkOrderListRequest(token, text) {
  return async (dispatch) => {
    try {

      dispatch({
        type: ACTION_WORK_ORDER_REQUEST, payload: true
      });

      const allWorkOrderList = await WorkOrderService.getAllWorkOrders(token, text);

      dispatch({
        type: ACTION_WORK_ORDER_REQUEST, payload: false
      });

      dispatch({
        type: ACTION_ALL_WORK_ORDER_LIST_SUCCESS, payload: allWorkOrderList
      });

    } catch (err) {
      console.log(err)
      dispatch({
        type: ACTION_WORK_ORDER_REQUESTED_ERROR, payload: err
      });
    }
  }
}

export function workOrderCreate(data) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_WORK_ORDER_REQUEST, payload: true
      });

      const workOrderCreated = await WorkOrderService.createWorkOrder(getState().user.data.Token, data.data);

      dispatch({
        type: ACTION_WORK_ORDER_REQUEST, payload: false
      });

      dispatch({
        type: ACTION_WORK_ORDER_CREATE_SUCCESS, payload: workOrderCreated
      });

    } catch (err) {
      console.log(err)
      dispatch({
        type: ACTION_WORK_ORDER_REQUESTED_ERROR, payload: false
      });
    }
  }
}

export function workOrderEdit(data) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_WORK_ORDER_REQUEST, payload: true
      });
      const workOrderEditedData = await WorkOrderService.editWorkOrder(getState().user.data.Token, data.data);
      dispatch({
        type: ACTION_WORK_ORDER_REQUEST, payload: false
      });

      dispatch({
        type: ACTION_WORK_ORDER_EDIT_SUCCESS, payload: workOrderEditedData
      });

      dispatch({
        type: ACTION_WORK_ORDER_EDIT_SUCCESS, payload: workOrderEditedData
      });
      if (workOrderEditedData) {
        getWorkOrderDetail(data.data.WorkOrderId)
      }


    } catch (err) {
      console.log(err)
      dispatch({
        type: ACTION_WORK_ORDER_REQUESTED_ERROR, payload: null
      });
    }

  }
}

export function createMaterial(data) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_WORK_ORDER_REQUEST, payload: true
      });

      const workOrderCreateMaterialData = await WorkOrderService.createMaterial(getState().user.data.Token, data);

      dispatch({
        type: ACTION_WORK_ORDER_REQUEST, payload: false
      });

      dispatch({
        type: ACTION_WORK_ORDER_CREATE_MATERIAL_SUCCESS, payload: workOrderCreateMaterialData
      });

    } catch (err) {
      console.log(err)
      dispatch({
        type: ACTION_WORK_ORDER_REQUESTED_ERROR, payload: null
      });
    }

  }
}

export function laborCreate(data) {

  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_WORK_ORDER_REQUEST, payload: true
      });

      const workOrderCreated = await LaborService.createLabor(getState().user.data.Token, data);

      dispatch({
        type: ACTION_WORK_ORDER_REQUEST, payload: false
      });

      dispatch({
        type: ACTION_WORK_ORDER_CREATE_LABOR_SUCCESS, payload: workOrderCreated
      });

    } catch (err) {
      console.log(err)
      dispatch({
        type: ACTION_WORK_ORDER_REQUESTED_ERROR, payload: false
      });
    }
  }
}




export function getWorkOrderDetail(id) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_WORK_ORDER_REQUEST, payload: true
      });

      const workOrderData = await WorkOrderService.getWorkOrderDetail(getState().user.data.Token, id);

      dispatch({
        type: ACTION_WORK_ORDER_REQUEST, payload: false
      });

      dispatch({
        type: ACTION_WORK_ORDER_DETAIL_SUCCESS, payload: workOrderData.data
      });

    } catch (err) {
      console.log(err)
      dispatch({
        type: ACTION_WORK_ORDER_REQUESTED_ERROR, payload: false
      });
    }
  }
}
