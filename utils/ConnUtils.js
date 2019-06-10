import httpClient from './HttpClientUtils';

import { API_URL } from '../constants/Properties';
import { UNEXPECTED_ERROR } from '../constants/ApplicationErrors'

export const handleError = (error) => {
  return error;
};

export const httpClientWeb = httpClient(API_URL, handleError);