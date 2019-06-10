import api from '../api'

export default class LaborService {

  static async getLabors(token, id) {
    api.setHeaders({'Authorization': 'Baerer ' + token});
    const response = await api.get('WorkOrderLaborTransfer/GetWithPagination?approved=&dtStart=&qlDebitAccount=&laborId=&page=1&pageSize=20&workOrderId='+ id );
    return response;
  }

  static async getLaborsWithPagination(token, id) {
    api.setHeaders({'Authorization': 'Baerer ' + token});
    const response = await api.get('Labor/GetWithPagination?description=&laborId=&page=1&pageSize=20');
    return response;
  }
  static async createLabor(token, data) {

    api.setHeaders({'Authorization': 'Baerer ' + token});
    const response = await api.post('WorkOrderLaborTransfer/create', data);
    return response;
  }
}
