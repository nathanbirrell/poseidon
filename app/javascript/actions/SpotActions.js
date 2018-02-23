import * as ReduxUtils from 'lib/ReduxUtils';
import SpotService from 'services/SpotService';
import { FETCH_SPOT } from 'types';

export const fetchSpot = (spotId) => (dispatch, getState) => ReduxUtils.apiSyncAction(
  dispatch,
  FETCH_SPOT,
  SpotService.fetchSpot.bind(null, spotId),
  getState().spot.isSyncing,
);