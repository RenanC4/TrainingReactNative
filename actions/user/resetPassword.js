import resetPasswordService from '../../services/user/resetPassword'
export const ACTION_RESET_PASSWORD_REQUESTED = 'reset-password-requested';
export const ACTION_RESET_PASSWORD_ERROR = 'reset-password-requested-error';
export const ACTION_RESET_PASSWORD_SUCCESS = 'reset-password-requested-success';

export function resetPasswordRequest(username) {

  return async (dispatch) => {

    try {
      dispatch({
        type: ACTION_RESET_PASSWORD_REQUESTED, payload: true
      });

      const resetPasswordData = await resetPasswordService.resetPassword(username);

      dispatch({
        type: ACTION_RESET_PASSWORD_REQUESTED, payload: false
      });

      if(resetPasswordData.ok) {
      dispatch({
        type: ACTION_RESET_PASSWORD_SUCCESS, payload: {id:1, message:'Email sent'}
      });
      }

    } catch (err) {

      if(err.data.id == null){
        dispatch({
          type: ACTION_RESET_PASSWORD_ERROR, payload: {id: 2, message: 'User ID not found, please try again'}
        });
      }

      dispatch({
        type: ACTION_RESET_PASSWORD_REQUESTED, payload: false
      });

      dispatch({
        type: ACTION_RESET_PASSWORD_ERROR, payload: err
      });
    }
  }
}