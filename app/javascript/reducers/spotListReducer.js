import update from 'immutability-helper';
import * as ReduxUtils from 'lib/ReduxUtils';
import { FETCH_SPOT_LIST } from 'types';

const initialState = ReduxUtils.apiSubstore();

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SPOT_LIST.REQUEST:
      return update(state, ReduxUtils.apiReducerSyncRequest());
    case FETCH_SPOT_LIST.SUCCESS:
      return update(state, ReduxUtils.apiReducerUpdate(action.data));
    case FETCH_SPOT_LIST.FAIL:
      return update(state, ReduxUtils.apiReducerSyncFailed(action.error));
    default:
      return state;
  }
};