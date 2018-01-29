import { SPOTS_UPDATE } from '../actions/SpotActions';

const initialState = {
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SPOTS_UPDATE:
      console.log(action);
      return {
        ...state,
        data: action.payload.body,
      };
    default:
      return state;
  }
};