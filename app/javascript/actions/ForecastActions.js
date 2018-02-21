import * as ReduxUtils from 'lib/ReduxUtils';
import moment from 'moment';
import SpotService from 'services/SpotService';

import { FETCH_SURF_FORECAST, CHANGE_SELECTED_DATETIME } from 'types';

export const updateSelectedDateTime = (selectedDateTime) => {
  console.log(`update time ${selectedDateTime}`);
  return {
    type: CHANGE_SELECTED_DATETIME,
    selectedDateTime: moment(selectedDateTime),
  };
};

export const fetchSurfForecast = (spotId) => (dispatch, getState) => ReduxUtils.apiSyncAction(
  dispatch,
  FETCH_SURF_FORECAST,
  SpotService.fetchSurfForecast.bind(null, spotId),
  getState().forecasts.asyncForecasts.isSyncing,
);