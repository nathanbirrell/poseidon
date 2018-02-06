import { combineReducers } from 'redux';
import SpotsReducer from './spotsReducer';
import ForecastsReducer from './forecastsReducer';
import SpotDetailReducer from './spotDetailReducer';

const rootReducer = combineReducers({
  spots: SpotsReducer,
  forecasts: ForecastsReducer,
  spot: SpotDetailReducer,
});

export default rootReducer;