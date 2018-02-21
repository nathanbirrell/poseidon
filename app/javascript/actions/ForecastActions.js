import moment from 'moment';
import SurfForecastService from 'services/SurfForecastService';

import { FETCH_SURF_FORECAST } from 'types';

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
  type: Types.CHANGE_SELECTED_DATETIME,
  selectedDateTime: moment(selectedDateTime),
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