import api from '../api'
import {AsyncStorage} from 'react-native';

export default class WorkOrderService {

  static async getWorkOrders(token, text) {

    let url = '/workorder/GetMineWithPagination?page=1&orderBy=CHANGEDATE&direction=true&workOrderId&description&locationId&assetId&statusId';

    if (text) {
      url = url + '=' + text;
    }

    api.setHeaders({'Authorization': 'Baerer ' + token});
    const response = await api.get(url);

    return response;
  }

  static async getMyGroupWorkOrders(token, text) {

    let url = 'workorder/GetGroupWithPagination?page=1&orderBy=CHANGEDATE&direction=true&workOrderId&description&locationId&assetId&statusId';
    if (text) {
      url = url + '=' + text;
    }

    api.setHeaders({'Authorization': 'Baerer ' + token});
    const response = await api.get(url);

    return response;
  }

  static async getWorkOrdersByDate(token, date) {
    api.setHeaders({'Authorization': 'Baerer ' + token});
    const response = await api.get('workorder/GetByDate?date=' + date);

    return response;
  }

  static async getAllWorkOrders(token, text) {
    let url = '/workorder/GetAllAvailable?page=1&orderBy=CHANGEDATE&direction=true&workOrderId&description&locationId&assetId&statusId';
    if (text) {
      url = url + '=' + text;
    }

    api.setHeaders({'Authorization': 'Baerer ' + token});
    const response = await api.get(url);

    return response;
  }

  static async getReportedByMeWorkOrders(token, text) {

    let url = 'workorder/GetReportedByMeWithPagination?page=1&orderBy=CHANGEDATE&direction=true&workOrderId&description&locationId&assetId&statusId';
    if (text) {
      url = url + '=' + text;
    }

    api.setHeaders({'Authorization': 'Baerer ' + token});
    const response = await api.get(url);
    return response;
  }


  static async createWorkOrder(token, data) {

    api.setHeaders({'Authorization': 'Baerer ' + token});

    const response = await api.post('workorder/Create', data);
    return response;
  }


  static async editWorkOrder(token, data) {

    api.setHeaders({'Authorization': 'Baerer ' + token});

    const response = await api.post('workorder/Create', data);
    return response;
  }

  static async createMaterial(token, data) {
    api.setHeaders({'Authorization': 'Baerer ' + token});

    const response = await api.post('WorkOrderMatUserTransfer/create', data);
    return response;
  }

  static async getWorkOrderDetail(token, id) {
      api.setHeaders({'Authorization': 'Baerer ' + token});

    const response = await api.get(`workorder/getbyid/${id}`);

    return response;
  }


}
