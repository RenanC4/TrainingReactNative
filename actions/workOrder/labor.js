import LaborService from '../../services/workOrder/labor'

export const ACTION_LABOR_SUCCESS = 'labor-success';

export const ACTION_LABOR_CREATE_SUCCESS = 'labor-create-success';

export const ACTION_LABOR_REQUESTED_ERROR = 'labor-requested-error';
export const ACTION_LABOR_REQUEST = 'labor-request';

export function laborListRequest(token, id) {

  return async (dispatch) => {
    try {

      dispatch({
        type: ACTION_LABOR_REQUEST, payload: true
      });

      const labor = await LaborService.getLabors(token, id);

      dispatch({
        type: ACTION_LABOR_REQUEST, payload: false
      });

      dispatch({
        type: ACTION_LABOR_SUCCESS, payload: labor
      });

    } catch (err) {
      console.log(err)
      dispatch({
        type: ACTION_LABOR_REQUESTED_ERROR, payload: err
      });
    }
  }
}

export function laborCreate(data) {

  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_LABOR_REQUEST, payload: true
      });

      const workOrderCreated = await LaborService.createLabor(getState().user.data.Token, data);

      dispatch({
        type: ACTION_LABOR_REQUEST, payload: false
      });

      dispatch({
        type: ACTION_LABOR_CREATE_SUCCESS, payload: workOrderCreated
      });

    } catch (err) {
      console.log(err)
      dispatch({
        type: ACTION_LABOR_REQUESTED_ERROR, payload: false
      });
    }
  }
}
