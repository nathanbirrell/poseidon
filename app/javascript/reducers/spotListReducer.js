import update from 'immutability-helper';
import * as ReduxUtils from 'lib/ReduxUtils';
import * as Types from 'types';

const initialState = ReduxUtils.apiSubstore('spots');

console.log(initialState);

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_SPOT_LIST_REQUEST:
      return update(state, ReduxUtils.apiReducerSyncRequest('spots'));
    case Types.FETCH_SPOT_LIST_SUCCESS:
      return update(state, ReduxUtils.apiReducerUpdate(action.data, 'spots'));
    case Types.FETCH_SPOT_LIST_FAILED:
      return update(state, ReduxUtils.apiReducerSyncFailed(action.error, 'spots'));
    default:
      return state;
  }
};