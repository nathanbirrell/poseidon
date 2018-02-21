import moment from 'moment';
import SpotService from 'services/SpotService';

import { FETCH_SURF_FORECAST, CHANGE_SELECTED_DATETIME } from 'types';

export const fetchSurfForecastRequest = () => ({
  type: FETCH_SURF_FORECAST.REQUEST,
});

export const fetchSurfForecastSuccess = (data) => ({
  type: FETCH_SURF_FORECAST.SUCCESS,
  data,
});

export const fetchSurfForecastError = (error) => ({
  type: FETCH_SURF_FORECAST.ERROR,
  error,
});

export const updateSelectedDateTime = (selectedDateTime) => ({
  type: CHANGE_SELECTED_DATETIME,
  selectedDateTime: moment(selectedDateTime),
});

export const fetchSurfForecast = (spotId) => {
  return async function (dispatch) {
    dispatch(fetchSurfForecastRequest());

    try {
      const forecast = await SpotService.fetchSurfForecast(spotId);
      dispatch(fetchSurfForecastSuccess(forecast));
    } catch (error) {
      dispatch(fetchSurfForecastError(error));
      console.error(error);
    }
  };
};