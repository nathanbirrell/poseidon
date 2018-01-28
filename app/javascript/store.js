import { createStore, compose, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import rootReducer from './reducers';

// TODO: Replace redux-promise here with redux-saga

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(ReduxPromise),
      window.devToolsExtension ? window.devToolsExtension() : undefined,
    ),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}