import * as Types from 'types';

const initialState = {
  data: {},
  isError: false,
  isSyncing: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_SPOT_DETAIL_REQUEST:
      return {
        ...state,
        isSyncing: true,
      };
    case Types.FETCH_SPOT_DETAIL_SUCCESS:
      return {
        ...state,
        data: action.data,
        isSyncing: false,
      };
    case Types.FETCH_SPOT_DETAIL_ERROR:
      return {
        ...state,
        isError: true,
        isSyncing: false,
      };
    default:
      return state;
  }
};