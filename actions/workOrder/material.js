import MaterialService from '../../services/workOrder/material'

export const ACTION_MATERIAL_SUCCESS = 'material-success';

export const ACTION_MATERIAL_CREATE_SUCCESS = 'material-create-success';

export const ACTION_MATERIAL_REQUESTED_ERROR = 'material-requested-error';
export const ACTION_MATERIAL_REQUEST = 'material-request';

export function materialRequest(token, id) {

  return async (dispatch) => {
    try {

      dispatch({
        type: ACTION_MATERIAL_REQUEST, payload: true
      });

      const material = await MaterialService.getMaterial(token, id);

      dispatch({
        type: ACTION_MATERIAL_REQUEST, payload: false
      });

      dispatch({
        type: ACTION_MATERIAL_SUCCESS, payload: material
      });

    } catch (err) {
      console.log(err)
      dispatch({
        type: ACTION_MATERIAL_REQUESTED_ERROR, payload: err
      });
    }
  }
}

export function laborCreate(data) {

  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_MATERIAL_REQUEST, payload: true
      });

      const workOrderCreated = await LaborService.createLabor(getState().user.data.Token, data.data);

      dispatch({
        type: ACTION_MATERIAL_REQUEST, payload: false
      });

      dispatch({
        type: ACTION_MATERIAL_CREATE_SUCCESS, payload: workOrderCreated
      });

    } catch (err) {
      console.log(err)
      dispatch({
        type: ACTION_MATERIAL_REQUESTED_ERROR, payload: false
      });
    }
  }
}
