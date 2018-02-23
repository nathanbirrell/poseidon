import update from 'immutability-helper';
import * as ReduxUtils from 'lib/ReduxUtils';
import { FETCH_SPOT } from 'types';

const initialState = {
  ...ReduxUtils.apiSubstore(),
  selectedDateTime: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SPOT.REQUEST:
      return update(state, ReduxUtils.apiReducerSyncRequest());
    case FETCH_SPOT.SUCCESS:
      return update(state, ReduxUtils.apiReducerUpdate(action.data));
    case FETCH_SPOT.ERROR:
      return update(state, ReduxUtils.apiReducerSyncFailed(action.error));
    default:
      return state;
  }
};