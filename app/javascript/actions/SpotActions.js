import 'regenerator-runtime/runtime'; // See https://github.com/redux-saga/redux-saga/issues/280
import { call, put } from 'redux-saga/effects';
import SpotsService from 'services/SpotsService';

import * as Types from 'types';

export const fetchSpotsRequest = () => ({
  type: Types.FETCH_SPOTS_REQUEST,
});

export function* fetchSpots(action) {
  try {
    const spots = yield call(SpotsService.fetchSpots);
    console.log(spots);
    yield put({ type: Types.FETCH_SPOTS_SUCCESS, data: spots.body });
  } catch (error) {
    yield put({ type: Types.FETCH_SPOTS_SUCCESS, data: error });
    console.error(error);
  }
}