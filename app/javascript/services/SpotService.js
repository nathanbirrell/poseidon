import GenericApiService from './GenericApiService';

export default class SpotService {
  /**
   * Retrieves the Spots for user's dashboard
   * @returns {Promise}
   */
  static async fetchSpots() {
    return GenericApiService.get('/spots.json');
  }

  /**
   * Retrieves the Spot details for a particular spot
   * @returns {Promise}
   */
  static async fetchSpot(spotId) {
    return GenericApiService.get(`/spots/${spotId}.json`);
  }

  /**
   * Retrieves the Surf Forecast for a particular spot
   * @returns {Promise}
   */
  static async fetchSurfForecast(spotId) {
    return GenericApiService.get(`/spots/${spotId}/forecast/surf.json`);
  }
}
