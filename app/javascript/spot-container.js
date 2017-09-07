import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import MathUtil from 'math-util.js';
import SpotUtil from 'spot-util.js';

import SpotBanner from './spot-banner';
import NavigationTabs from './navigation-tabs';
import AreaGraph from './area-graph';
import SpotDayContainer from './spot-day-container';
import SpotForecastContainer from './spot-forecast-container';
import SpotAboutContainer from './spot-about-container';
import SpotTimeSlider from './spot-time-slider';

class SpotContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      navItems: [
        'Today',
        'Forecast',
        'About',
        'History',
      ],
      selectedNavItem: 0,
    };

    this.syncData = this.syncData.bind(this);
    this.updateSelectedNavItem = this.updateSelectedNavItem.bind(this);
    this.seedTime = this.seedTime.bind(this);
  }

  componentDidMount() {
    let spot = this.syncData(window.location.href + '.json');
    let forecasts = this.syncData(window.location.href + '/forecasts.json');

    Promise.all([spot, forecasts]).then(values => {
      const spotJson = JSON.parse(values[0]);
      const forecastsJson = JSON.parse(values[1]);
      const seed = this.seedTime(forecastsJson.swells, moment().utc());
      this.setState({
        spot: spotJson,
        forecasts: forecastsJson,
        seed,
        selectedTime: seed
      });
    });
  }

  syncData(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      // xhr.open("GET", window.location.href + '.json');
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  };

  updateSelectedNavItem(number) {
    this.setState({
      selectedNavItem: number,
    });
  }

  seedTime(data, time) {
    let seed = null;
    var sortedResult = data.slice().sort(function(a, b) {
      var dA = Math.abs(moment(a.date_time).utc() - time),
        dB = Math.abs(moment(b.date_time).utc() - time);
      if (dA < dB) {
        return -1;
      } else if (dA > dB) {
        return 1;
      } else {
        return 0;
      }
    });
    seed = data.indexOf(sortedResult[0]);
    console.log('Seed:', seed, data[seed], moment(data[seed].date_time).format("dd hh:mm a"));
    return seed;
  }

  render() {
    console.log('render');
    if (!this.state.spot || !this.state.forecasts) {
      return (
        <div>
          <SpotBanner isBusy />
          <NavigationTabs
            isBusy
            items={this.state.navItems}
            onChange={this.updateSelectedNavItem}
          />
          <SpotDayContainer />
        </div>
      );
    }

    const current_overall_rating =  this.state.forecasts.overall_ratings[this.state.selectedTime];

    console.log('rendering with selectedTime: ', this.state.selectedTime);

    return(
      <div>
        <SpotBanner
          current_potential={MathUtil.round(current_overall_rating.rating, 0)}
          name={this.state.spot.name}
          region={this.state.spot.region}
        />
        <NavigationTabs
          items={this.state.navItems}
          onChange={this.updateSelectedNavItem}
        />
        {this.state.selectedNavItem === this.state.navItems.indexOf('Today') ?
          <SpotDayContainer
            selectedTime={this.state.selectedTime}
            forecasts={this.state.forecasts}
          />
        : null}
        {this.state.selectedNavItem === this.state.navItems.indexOf('Forecast') ?
          <SpotForecastContainer
            forecasts={this.state.forecasts}
          />
        : null}
        {this.state.selectedNavItem === this.state.navItems.indexOf('About') ?
          <SpotAboutContainer
           data={this.state.spot}
          />
        : null}
        {this.state.selectedNavItem === this.state.navItems.indexOf('History') ?
        <div id="history-section" className="row">
          <div className="large-12 columns">
            <h3>HISTORY COMING SOON</h3>
          </div>
        </div>
        : null}
        <SpotTimeSlider />
      </div>
    );
  }
}

export default SpotContainer;
