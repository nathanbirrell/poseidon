import 'regenerator-runtime/runtime'; // See https://github.com/redux-saga/redux-saga/issues/280

import SpotListService from 'services/SpotListService';

import * as Types from 'types';

export const fetchSpotsRequest = () => ({
  type: Types.FETCH_SPOT_LIST_REQUEST,
});

export const fetchSpotsSuccess = (data) => ({
  type: Types.FETCH_SPOT_LIST_SUCCESS,
  data,
});

export const fetchSpotsError = (error) => ({
  type: Types.FETCH_SPOT_LIST_ERROR,
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