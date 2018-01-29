import { combineReducers } from 'redux';
import SpotsReducer from './spotsReducer';

const rootReducer = combineReducers({
  spots: SpotsReducer,
});

export default rootReducer;