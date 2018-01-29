import { combineReducers } from 'redux';
import SpotsReducer from './spots';

const rootReducer = combineReducers({
  spots: SpotsReducer,
});

export default rootReducer;