import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import rootReducer from './reducers';

const browserHistory = createHistory();
const historyMiddleware = routerMiddleware(browserHistory);

export default function configureStore(initialState) {
  const reducers = combineReducers({
    ...rootReducer,
    router: routerReducer,
  });

  const middlewares = [thunk, historyMiddleware];

  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : undefined,
    ),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return {
    store,
    browserHistory,
  };
}