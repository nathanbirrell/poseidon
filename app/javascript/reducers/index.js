import { combineReducers } from 'redux';
import SpotListReducer from './spotListReducer';
import ForecastsReducer from './forecastsReducer';
import SpotReducer from './spotReducer';

const rootReducer = combineReducers({
  spots: SpotListReducer,
  forecasts: ForecastsReducer,
  spot: SpotReducer,
});

export default rootReducer;