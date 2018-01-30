import request from 'superagent';

// import { SpotsFactory } from 'core/models/Spots';
import { API_BASE_URL } from '../config';

export default class SpotsService {
  /**
   * Retrieves the Spots for user's dashboard
   * @returns {Promise}
   */
  static async fetchSpots() {
    const endpoint = `${API_BASE_URL}/spots.json`;
    const response = await request.get(endpoint);
    return response.body;
  }
}
