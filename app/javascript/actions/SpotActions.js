import SpotService from 'services/SpotService';

import * as Types from 'types';

export const fetchSpotRequest = () => ({
  type: Types.FETCH_SPOT_REQUEST,
});

export const fetchSpotSuccess = (data) => ({
  type: Types.FETCH_SPOT_SUCCESS,
  data,
});

export const fetchSpotError = (error) => ({
  type: Types.FETCH_SPOT_ERROR,
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