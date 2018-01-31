import * as Types from 'types';

const initialState = {
  data: [],
  isError: false,
  isSyncing: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_SPOTS_REQUEST:
      return {
        ...state,
        isSyncing: true,
      };
    case Types.FETCH_SPOTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isSyncing: false,
      };
    case Types.FETCH_SPOTS_ERROR:
      return {
        ...state,
        isError: true,
        isSyncing: false,
      };
    default:
      return state;
  }
};