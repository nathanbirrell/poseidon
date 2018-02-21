import { combineReducers } from 'redux';
import spotsList from './spotListReducer';
import forecasts from './forecastsReducer';
import spot from './spotReducer';

const rootReducer = combineReducers({
  spotsList,
  forecasts,
  spot,
});

export default rootReducer;