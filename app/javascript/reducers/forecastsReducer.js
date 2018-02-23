import update from 'immutability-helper';
import * as ReduxUtils from 'lib/ReduxUtils';
import * as Types from 'types';

const initialState = {
  ...ReduxUtils.apiSubstore(),
  selectedDateTime: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_SURF_FORECAST.REQUEST:
      return update(state, ReduxUtils.apiReducerSyncRequest());
    case Types.FETCH_SURF_FORECAST.SUCCESS:
      return update(state, ReduxUtils.apiReducerUpdate(action.data));
    case Types.FETCH_SURF_FORECAST.ERROR:
      return update(state, ReduxUtils.apiReducerSyncFailed(action.error));
    case Types.CHANGE_SELECTED_DATETIME:
      return {
        ...state,
        selectedDateTime: action.selectedDateTime,
      };
    default:
      return state;
  }
};