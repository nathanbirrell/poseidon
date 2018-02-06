import request from 'superagent';

import { API_BASE_URL } from '../config';

export default class SpotsService {
  /**
   * Retrieves the Spot details for a particular spot
   * @returns {Promise}
   */
  static async fetchSpot(spotId) {
    const endpoint = `${API_BASE_URL}/spots/${spotId}.json`;
    const response = await request.get(endpoint);
    return response.body;
  }
}