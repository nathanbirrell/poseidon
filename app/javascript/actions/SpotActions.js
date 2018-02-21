import SpotService from 'services/SpotService';

import { FETCH_SPOT } from 'types';

export const fetchSpotRequest = () => ({
  type: FETCH_SPOT.REQUEST,
});

export const fetchSpotSuccess = (data) => ({
  type: FETCH_SPOT.SUCCESS,
  data,
});

export const fetchSpotError = (error) => ({
  type: FETCH_SPOT.ERROR,
  error,
});

export const fetchSpot = (spotId) => {
  return async function (dispatch) {
    dispatch(fetchSpotRequest());

    try {
      const spot = await SpotService.fetchSpot(spotId);
      dispatch(fetchSpotSuccess(spot));
    } catch (error) {
      dispatch(fetchSpotError(error));
      console.error(error);
    }
  };
};