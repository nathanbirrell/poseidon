import 'regenerator-runtime/runtime'; // See https://github.com/redux-saga/redux-saga/issues/280

import SpotDetailService from 'services/SpotDetailService';

import * as Types from 'types';

export const fetchSpotDetailRequest = () => ({
  type: Types.FETCH_SPOT_DETAIL_REQUEST,
});

export const fetchSpotDetailSuccess = (data) => ({
  type: Types.FETCH_SPOT_DETAIL_SUCCESS,
  data,
});

export const fetchSpotDetailError = (error) => ({
  type: Types.FETCH_SPOT_DETAIL_ERROR,
  error,
});

export const fetchSpotDetail = (spotId) => {
  return async function (dispatch) {
    dispatch(fetchSpotDetailRequest());

    try {
      const spot = await SpotDetailService.fetchSpotDetail(spotId);
      dispatch(fetchSpotDetailSuccess(spot));
    } catch (error) {
      dispatch(fetchSpotDetailError(error));
      console.error(error);
    }
  };
};