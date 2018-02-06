import request from 'superagent';

import { API_BASE_URL } from '../config';

export default class SurfForecastService {
  /**
   * Retrieves the Surf Forecast for a particular spot
   * @returns {Promise}
   */
  static async fetchSurfForecast(spotId) {
    console.log('making request!');
    const endpoint = `${API_BASE_URL}/spots/${spotId}/forecast/surf.json`;
    const response = await request.get(endpoint);
    console.log('received response', response.body);
    return response.body;
  }
}