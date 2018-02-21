import * as Types from 'types';

const initialState = {
  data: {},
  isError: false,
  isSyncing: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_SURF_FORECAST.REQUEST:
      return {
        ...state,
        isSyncing: true,
      };
    case Types.FETCH_SURF_FORECAST.SUCCESS:
      return {
        ...state,
        data: action.data,
        isSyncing: false,
      };
    case Types.FETCH_SURF_FORECAST.ERROR:
      return {
        ...state,
        isError: true,
        isSyncing: false,
      };
    case Types.CHANGE_SELECTED_DATETIME:
      return {
        ...state,
        selectedDateTime: action.selectedDateTime,
      };
    default:
      return state;
  }
};