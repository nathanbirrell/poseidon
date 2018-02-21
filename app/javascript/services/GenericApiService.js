import request from 'superagent';
import { API_BASE_URL } from '../config';

/**
 * TODO: expand this to handle Promises properly with Bluebird
 */

export default class GenericApiService {
  static async get(_endpoint) {
    try {
      const endpoint = `${API_BASE_URL}${_endpoint}`;
      const response = await request.get(endpoint);
      return response.body;
    } catch (error) {
      throw new Error(error);
    }
  }
}