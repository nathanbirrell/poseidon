import * as ReduxUtils from 'lib/ReduxUtils';
import SpotService from 'services/SpotService';
import { FETCH_SPOT_LIST } from 'types';

export const fetchSpots = () => (dispatch) => ReduxUtils.apiSyncAction(
  dispatch,
  FETCH_SPOT_LIST,
  SpotService.fetchSpots,
);