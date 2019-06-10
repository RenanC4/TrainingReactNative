import api from '../api'

export default class AttachmentService {

  static async getAttachmentList(token, id) {
    api.setHeaders({'Authorization': 'Baerer ' + token});
    const response = await api.get('workorderattachment/GetWithPagination?page=1&orderBy=ID&direction=false&workOrderId=' + id);
    return response;
  }

  static async downloadAttachmentById(token, id) {
    api.setHeaders({'Authorization': 'Baerer ' + token});
    const response = await api.get('workorderattachment/GetFileById/'+ id );
    return response;

  }


  static async createMaterial(token, data) {
    api.setHeaders({'Authorization': 'Baerer ' + token});
    const response = await api.post('labor/create', data);
    return response;
  }
}