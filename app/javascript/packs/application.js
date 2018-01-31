import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MomentConfig from 'config/MomentConfig';

import AppContainer from 'containers/AppContainer';
import configureStore from 'store';

const { store, browserHistory } = configureStore();

MomentConfig();

ReactDOM.render(
  <Provider store={store}>
    <AppContainer browserHistory={browserHistory} />
  </Provider>,
  document.getElementById('poseidon-app'),
);