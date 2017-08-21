import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SpotContainer from '../spot-container';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <SpotContainer />,
    document.getElementById('main').appendChild(document.createElement('div')),
  )
})
