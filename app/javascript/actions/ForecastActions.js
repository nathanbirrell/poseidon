import SurfForecastService from 'services/SurfForecastService';

import * as Types from 'types';

export const fetchSurfForecastRequest = () => ({
  type: Types.FETCH_SURF_FORECAST_REQUEST,
});

export const fetchSurfForecastSuccess = (data) => ({
  type: Types.FETCH_SURF_FORECAST_SUCCESS,
  data,
});

export const fetchSurfForecastError = (error) => ({
  type: Types.FETCH_SURF_FORECAST_ERROR,
  error,
});

export const fetchSurfForecast = (spotId) => {
  return async function (dispatch) {
    dispatch(fetchSurfForecastRequest());

    try {
      const forecast = await SurfForecastService.fetchSurfForecast(spotId);
      dispatch(fetchSurfForecastSuccess(forecast));
    } catch (error) {
      dispatch(fetchSurfForecastError(error));
      console.error(error);
    }
  };
};