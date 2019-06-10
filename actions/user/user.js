import AuthService from '../../services/user/auth'

export const ACTION_USER_LOGIN_REQUESTED = 'user-login-requested';
export const ACTION_USER_LOGIN_SUCCESS = 'user-login-success';
export const ACTION_USER_LOGIN_ERROR = 'user-login-error';

export const ACTION_USER_LOGOFF = 'user-logoff';


export function userLogin(username, password) {
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTION_USER_LOGIN_REQUESTED, payload: true
      });

      const userData = await AuthService.auth(username, password);

      dispatch({
        type: ACTION_USER_LOGIN_REQUESTED, payload: false
      });

      dispatch({
        type: ACTION_USER_LOGIN_SUCCESS, payload: userData.data
      });

    } catch (err) {

      if (err.data.id == null) {
        dispatch({
          type: ACTION_USER_LOGIN_ERROR, payload: {id: 2, message: 'User or password incorrect, please try again'}
        });
      }

      dispatch({
        type: ACTION_USER_LOGIN_REQUESTED, payload: false
      });
    }
  }
}


export function userLogoff() {
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTION_USER_LOGOFF, payload: false
      });

    } catch (err) {

      if (err.data.id == null) {
        dispatch({
          type: ACTION_USER_LOGIN_ERROR, payload: {id: 2, message: 'User or password incorrect, please try again'}
        });
      }

      dispatch({
        type: ACTION_USER_LOGIN_REQUESTED, payload: false
      });
    }
  }
}
