import * as ReduxUtils from 'lib/ReduxUtils';
import SpotListService from 'services/SpotListService';
import { FETCH_SPOT_LIST } from 'types';

export const fetchSpots = () => (dispatch) => ReduxUtils.apiSyncAction(
  dispatch,
  FETCH_SPOT_LIST,
  SpotListService.fetchSpots,
);