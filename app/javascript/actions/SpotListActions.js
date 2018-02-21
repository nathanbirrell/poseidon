import SpotListService from 'services/SpotListService';
import { FETCH_SPOT_LIST } from 'types';

// TODO: introduce ReduxUtils.apiSyncAction() here!

export const fetchSpotsRequest = () => ({
  type: FETCH_SPOT_LIST.REQUEST,
});

export const fetchSpotsSuccess = (data) => ({
  type: FETCH_SPOT_LIST.SUCCESS,
  data,
});

export const fetchSpotsError = (error) => ({
  type: FETCH_SPOT_LIST.FAIL,
  error,
});

export const fetchSpots = () => {
  return async function (dispatch) {
    dispatch(fetchSpotsRequest());

    try {
      const spots = await SpotListService.fetchSpots();
      dispatch(fetchSpotsSuccess(spots));
    } catch (error) {
      dispatch(fetchSpotsError(error));
      console.error(error);
    }
  };
};