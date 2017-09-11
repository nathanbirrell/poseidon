import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from '../AppContainer';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <AppContainer />,
    document.getElementById('main').appendChild(document.createElement('div')),
  );
})
