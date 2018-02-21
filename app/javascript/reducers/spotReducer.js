import { FETCH_SPOT } from 'types';

const initialState = {
  data: {},
  isError: false,
  isSyncing: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SPOT.REQUEST:
      return {
        ...state,
        isSyncing: true,
      };
    case FETCH_SPOT.SUCCESS:
      return {
        ...state,
        data: action.data,
        isSyncing: false,
      };
    case FETCH_SPOT.ERROR:
      return {
        ...state,
        isError: true,
        isSyncing: false,
      };
    default:
      return state;
  }
};