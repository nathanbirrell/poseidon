import request from 'superagent';

import GenericAPIService from './GenericAPIService';
// import { SpotsFactory } from 'core/models/Spots';
import { API_BASE_URL } from '../config';

export default class SpotsService {
  /**
   * Retrieves the Spots for user's dashboard
   * @returns {Promise}
   */
  static syncSpots() {
    const endpoint = `${API_BASE_URL}/spots.json`;
    return request.get(endpoint);
    // return GenericAPIService.get(endpoint);
  }
}
