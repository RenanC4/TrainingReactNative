import api from '../api'
import md5 from 'md5'
export default class UserService {

  static async auth(username, password) {
    const response = await api.get( `login/Authenticate?maxPesonId=${username}&password=${md5(password)}`);
    return response;
  }
}
