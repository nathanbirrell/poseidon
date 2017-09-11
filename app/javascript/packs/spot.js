import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AppContainer from '../AppContainer';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <AppContainer />,
    document.getElementById('main').appendChild(document.createElement('div')),
  );
})
