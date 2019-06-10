import api from '../api'

export default class ResetPasswordService {

  static async resetPassword(userId) {
    const response = await api.get(`login/SendRecoveryEmail?maxPesonId=${userId}`);
    return response;
  }
}