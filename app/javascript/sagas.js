import { takeLatest, all } from 'redux-saga/effects';

import * as Types from 'types';
import { fetchSpots } from 'actions/SpotActions';

function* spotsSaga() {
  yield takeLatest(Types.FETCH_SPOTS_REQUEST, fetchSpots);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    spotsSaga(),
  ]);
}
