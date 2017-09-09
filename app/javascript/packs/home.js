import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SpotsListingContainer from '../spots-list-container';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <SpotsListingContainer />,
    document.getElementById('main').appendChild(document.createElement('div')),
  )
})
