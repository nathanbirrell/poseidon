import React from 'react';
import PropTypes from 'prop-types';

class SpotsListingContainer extends React.Component {
  constructor (props) {
    super(props);
    // this.state = {
    //   data: null,
    //   navItems: [
    //     'Today',
    //     'Forecast',
    //     'About',
    //     'History',
    //   ],
    //   selectedNavItem: 0,
    //   selectedDateTime: moment(),
    // };

    // this.syncData = this.syncData.bind(this);
    // this.updateSelectedNavItem = this.updateSelectedNavItem.bind(this);
    // this.findForecastSeedFromTime = this.findForecastSeedFromTime.bind(this);
    // this.updateSelectedDateTime = this.updateSelectedDateTime.bind(this);
  }

  componentDidMount() {
    // let spot = this.syncData(window.location.href + '.json');
    // let forecasts = this.syncData(window.location.href + '/forecasts.json');

    // Promise.all([spot, forecasts]).then(values => {
    //   const spotJson = JSON.parse(values[0]);
    //   const forecastsJson = JSON.parse(values[1]);
    //   this.setState({
    //     spot: spotJson,
    //     forecasts: forecastsJson,
    //   });
    // });
  }

  syncData(url) {
    // return new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.open("GET", url);
    //   // xhr.open("GET", window.location.href + '.json');
    //   xhr.onload = () => resolve(xhr.responseText);
    //   xhr.onerror = () => reject(xhr.statusText);
    //   xhr.send();
    // });
  };

  render() {
    console.log('render');
    <h1>Home </h1>
  }
}

export default SpotsListingContainer;
