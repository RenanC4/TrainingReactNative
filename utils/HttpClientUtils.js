import axios from 'axios';
import {includes} from 'lodash';


import {TIME_OUT} from '../constants/Properties';

const intercept = (instance, dispatch) => {
  instance.interceptors.response.use(undefined, (error) => {
    if (includes(error.toString(), '401')) {
      window.location.assign("/entrar");
      /*return dispatch(push('/entrar'));*/
    }

    return Promise.reject(error);
  });
};

const validateStatus = status => status.toString().indexOf('2') === 0;

const getInstance = (baseURL, dispatch) => {

  const accessToken = null;
  /*Cookies.get('user_token');*/
  let instance = null;
  if (!accessToken) {
    instance = axios.create({
      baseURL,
      timeout: TIME_OUT,
      validateStatus,
    });
  } else {
    instance = axios.create({
      baseURL,
      timeout: TIME_OUT,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      validateStatus,
    });
  }
  intercept(instance, dispatch);
  return instance;
};

const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};


const baseRequest = (baseURL, method, relativeURL, data, config, success, error, internalError, dispatch) => {

  const instance = getInstance(baseURL, dispatch);
  switch (method) {
    case HTTP_METHOD.GET:
      return instance
      .get(relativeURL, config)
      .then((response) => {
        if (response.data.error) {
          return error(response.data.error);
        }
        else {

          return success(response.data);

        }
      })
      .catch((internalError) => {
        return error(internalError);
      });
    case HTTP_METHOD.POST:
      return instance
      .post(relativeURL, data, config)
      .then((response) => {
        if (response.data.error) {
          return error(response.data.error);
        }
        else {
          return success(response.data.data);
        }
      })
      .catch((internalError) => {
        return error(internalError);
      });
    default:
      return null;
  }
};

const httpClient = (baseURL, internalError, dispatch) => ({
  get: (url, config, success, error) => baseRequest(baseURL, HTTP_METHOD.GET, url, null, config, success, error, internalError, dispatch),
  post: (url, data, config, success, error) => baseRequest(baseURL, HTTP_METHOD.POST, url, data, config, success, error, internalError, dispatch),
});

export default httpClient;
