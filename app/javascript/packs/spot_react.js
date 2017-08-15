import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SpotTimeSlider from '../spot-time-slider';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <SpotTimeSlider />,
    document.body.appendChild(document.createElement('div')),
  )
})
