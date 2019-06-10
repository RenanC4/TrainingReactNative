import {create} from 'apisauce';
import {Alert, AsyncStorage} from 'react-native'
import {_goToLogin} from '../screens/ResumeScreen/ResumeScreen.js'
import {StackActions, StackNavigator, StackRouter} from 'react-navigation'

const api = create({
  baseURL: 'http://api.softwrench2.com/api/',
  timeout: 30000
});


api.addResponseTransform(response => {

  StackActions.reset();

  if (!response.ok) throw response
});

api.axiosInstance.interceptors.response.use(function (response) {
  return response;
}, async function (err) {
  const error = JSON.stringify(err);
  let errorObj = JSON.parse(error);

  if (errorObj.request._response == 'timeout') {
    errorObj.data = {id: 0, Message: 'Request Timeout'}
    Alert.alert(
        'ERROR',
        errorObj.data.Message,
        [
          {
            text: 'OK', onPress: () => {
            }
          },
        ],
        {cancelable: true}
    )
    let res = errorObj

    return res
  }


  if (err.response) {
    let res = err.response;

    if (res.status === 401) {

      try{

       const login = await AsyncStorage.getItem('@MySuperStore:key');
        console.log(login)
        return login;


      }catch (err){
        console.log('a', err)

      }

    }
    else if (res.status == 500 && res.data.Message != 'InternalServer Error') {
      Alert.alert(
          'ERROR',
          res.data.Message,
          [
            {
              text: 'OK', onPress: () => {
              }
            },
          ],
          {cancelable: true}
      )

      res.data.Message = res.data.Message;
      return res;
    } else if (res.status == 500 && res.data.Message == 'InternalServer Error') {
      Alert.alert(
          'ERROR',
          'OPS... something went wrong, please try again later',
          [
            {
              text: 'OK', onPress: () => {
              }
            },
          ],
          {cancelable: true}
      )

      res.data.Message = res.data.Message;
      return res;
    }

    else if (res.status != 200) {
      res.data.Message = res.data.Message != undefined ? res.data.Message : 'GENERIC_ERROR';
      return res;
    }
  }


  return api.axiosInstance(null);
});

export default api;
