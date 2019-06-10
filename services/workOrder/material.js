import api from '../api'

export default class LaborService {

  static async getMaterial(token, id) {
    api.setHeaders({'Authorization': 'Baerer ' + token});
    const response = await api.get('WorkOrderMatUserTransfer/GetWithPagination?WorkOrderId='+ id + '&createAt=&description=&itemId=&lineType=&page=1&pageSize=20&quantity=&storeId=');
    return response;
  }


  static async createMaterial(token, data) {
    api.setHeaders({'Authorization': 'Baerer ' + token});
    const response = await api.post('labor/create', data);
    return response;
  }
}