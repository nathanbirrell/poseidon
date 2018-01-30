import 'regenerator-runtime/runtime'; // See https://github.com/redux-saga/redux-saga/issues/280

import SpotsService from 'services/SpotsService';

import * as Types from 'types';

export const fetchSpotsRequest = () => ({
  type: Types.FETCH_SPOTS_REQUEST,
});

export const fetchSpotsSuccess = (data) => ({
  type: Types.FETCH_SPOTS_SUCCESS,
  data,
});

export const fetchSpotsError = (error) => ({
  type: Types.FETCH_SPOTS_ERROR,
  error,
});

export const fetchSpots = () => {
  return async function (dispatch) {
    dispatch(fetchSpotsRequest());

    try {
      const spots = await SpotsService.fetchSpots();
      dispatch(fetchSpotsSuccess(spots));
    } catch (error) {
      dispatch(fetchSpotsError(error));
      console.error(error);
    }
  };
};