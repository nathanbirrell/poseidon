import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import MathUtil from 'math-util.js';
import SpotUtil from 'spot-util.js';

import SpotBanner from './spot-banner';
import NavigationTabs from './navigation-tabs';
import SpotInfoCard from './spot-info-card';
import AreaGraph from './area-graph';
import SpotAbout from './spot-about-container';
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
          <div id="current-section" className="row">
            <SpotInfoCard title='Swell' isBusy />
            <SpotInfoCard title='Wind' isBusy />
            <SpotInfoCard title='Tide' isBusy />
          </div>
        </div>
      );
    }

    const current_swell = this.state.forecasts.swells[this.state.selectedTime];
    const current_wind = this.state.forecasts.winds[this.state.selectedTime];
    const current_tide =  this.state.forecasts.tides[this.state.selectedTime];
    const optimals = this.state.spot.optimals;

    console.log('rendering with selectedTime: ', this.state.selectedTime);

    return(
      <div>
        <SpotBanner
          current_potential={MathUtil.round(this.state.spot.current_potential, 0)}
          name={this.state.spot.name}
          region={this.state.spot.region}
        />
        <NavigationTabs
          items={this.state.navItems}
          onChange={this.updateSelectedNavItem}
        />
        {this.state.selectedNavItem === this.state.navItems.indexOf('Today') ?
          <div id="today-section" className="row">
            <SpotInfoCard
              title='Swell'
              secondary={SpotUtil.swellFeetToDescription(SpotUtil.metresToFeet(current_swell.size))}
              rating={MathUtil.round(current_swell.rating, 0)}
              date_time={moment(current_swell.date_time).format("h:mm a")}
              data={[
                {
                  title: 'Rating',
                  indicator: SpotUtil.getVerdict(current_swell.rating),
                  prefix: '',
                  values: [{
                    value: MathUtil.round(current_swell.rating, 0),
                    unit: '%',
                  }],
                  subtext: `${SpotUtil.getPotential(current_swell.rating)} potential`,
                },
                {
                  title: 'Wave height',
                  indicator: SpotUtil.getVerdict(current_swell.size_rating),
                  prefix: '',
                  values: [{
                    value: MathUtil.round(SpotUtil.metresToFeet(current_swell.size), 1),
                    unit: 'ft',
                  }],
                  subtext: `@ ${MathUtil.round(current_swell.period, 1)} seconds`,
                  // optimum_vis: [{
                  //   label: '',
                  //   type: 'linear',
                  //   min: optimals.swell.size.min,
                  //   max: optimals.swell.size.max,
                  //   mix_min: optimals.swell.size.mixed_min,
                  //   mix_max: optimals.swell.size.mixed_max,
                  //   opt_min: optimals.swell.size.optimal_min,
                  //   opt_max: optimals.swell.size.optimal_max,
                  //   value: MathUtil.round(current_swell.size, 1),
                  //   unit: "m",
                  //   roc_value: optimals.swell.size.in_3_hours,
                  //   roc: (optimals.swell.size.in_3_hours - current_swell.size),
                  //   roc_direction: SpotUtil.getRocDirection(optimals.swell.size.in_3_hours - current_swell.size),
                  // }]
                },
                {
                  title: 'Direction',
                  indicator: SpotUtil.getVerdict(current_swell.direction_rating),
                  prefix: '',
                  values: [{
                    value: SpotUtil.degreesToText(current_swell.direction),
                    unit: '',
                  }],
                  subtext: `${current_swell.direction} deg`,
                  // optimum_vis: [{
                  //   label: '',
                  //   type: 'direction',
                  //   min: optimals.swell.direction.min,
                  //   max: optimals.swell.direction.max,
                  //   mix_min: optimals.swell.direction.mixed_min,
                  //   mix_max: optimals.swell.direction.mixed_max,
                  //   opt_min: optimals.swell.direction.optimal_min,
                  //   opt_max: optimals.swell.direction.optimal_max,
                  //   value: current_swell.direction,
                  //   unit: "deg",
                  //   min_label: SpotUtil.degreesToText(optimals.swell.direction.min),
                  //   max_label: SpotUtil.degreesToText(optimals.swell.direction.max),
                  //   roc_value: optimals.swell.direction.in_3_hours,
                  //   roc: (optimals.swell.direction.in_3_hours - current_swell.direction),
                  //   roc_direction: SpotUtil.getRocDirection(optimals.swell.direction.in_3_hours - current_swell.direction),
                  // }]
                }
              ]}
            />
            <SpotInfoCard
              title='Wind'
              secondary={SpotUtil.windKphToDescription(current_wind.speed)}
              rating={MathUtil.round(current_wind.rating, 0)}
              date_time={moment(current_wind.date_time).format("h:mm a")}
              data={[
                {
                  title: 'Rating',
                  indicator: SpotUtil.getVerdict(current_wind.rating),
                  prefix: '',
                  values: [{
                    value: MathUtil.round(current_wind.rating, 0),
                    unit: '%',
                  }],
                  subtext: `${SpotUtil.getPotential(current_wind.rating)} potential`,
                },
                {
                  title: 'Wind speed',
                  indicator: SpotUtil.getVerdict(current_wind.speed_rating),
                  prefix: '',
                  values: [{
                    value: MathUtil.round(SpotUtil.kphToKnots(current_wind.speed), 0),
                    unit: 'kts',
                  }],
                  subtext: `${current_wind.speed} kph`,
                  // optimum_vis: [{
                  //   label: '',
                  //   type: 'linear',
                  //   min: optimals.wind.speed.min,
                  //   max: optimals.wind.speed.max,
                  //   mix_min: optimals.wind.speed.mixed_min,
                  //   mix_max: optimals.wind.speed.mixed_max,
                  //   opt_min: optimals.wind.speed.optimal_min,
                  //   opt_max: optimals.wind.speed.optimal_max,
                  //   value: current_wind.speed,
                  //   unit: "kph",
                  //   roc_value: optimals.wind.speed.in_3_hours,
                  //   roc: (optimals.wind.speed.in_3_hours - current_wind.speed),
                  //   roc_direction: SpotUtil.getRocDirection(optimals.wind.speed.in_3_hours - current_wind.speed),
                  // }]
                },
                {
                  title: 'Direction',
                  indicator: SpotUtil.getVerdict(current_wind.direction_rating),
                  prefix: '',
                  values: [{
                    value:  SpotUtil.degreesToText(current_wind.direction),
                    unit: '',
                  }],
                  subtext: `${current_wind.direction} deg`,
                  // optimum_vis: [{
                  //   label: '',
                  //   type: 'direction',
                  //   min: optimals.wind.direction.min,
                  //   max: optimals.wind.direction.max,
                  //   mix_min: optimals.wind.direction.mixed_min,
                  //   mix_max: optimals.wind.direction.mixed_max,
                  //   opt_min: optimals.wind.direction.optimal_min,
                  //   opt_max: optimals.wind.direction.optimal_max,
                  //   value: current_wind.direction,
                  //   unit: "deg",
                  //   min_label: SpotUtil.degreesToText(optimals.wind.direction.min),
                  //   max_label: SpotUtil.degreesToText(optimals.wind.direction.max),
                  //   roc_value: optimals.wind.direction.in_3_hours,
                  //   roc: (optimals.wind.direction.in_3_hours - current_wind.direction),
                  //   roc_direction: SpotUtil.getRocDirection(optimals.wind.direction.in_3_hours - current_wind.direction),
                  // }]
                }
              ]}
            />
            <SpotInfoCard
              title='Tide'
              secondary={current_tide.state}
              rating={MathUtil.round(current_tide.rating, 0)}
              date_time={moment(current_tide.date_time).format("h:mm a")}
              data={[
                {
                  title: 'Rating',
                  indicator: SpotUtil.getVerdict(current_tide.rating),
                  prefix: '',
                  values: [{
                    value: MathUtil.round(current_tide.rating, 0),
                    unit: '%',
                  }],
                  subtext: `${SpotUtil.getPotential(current_tide.rating)} potential`,
                },
                {
                  title: 'Tide height',
                  indicator: SpotUtil.getVerdict(current_tide.rating),
                  prefix: '',
                  values: [{
                    value: current_tide.height,
                    unit: 'm',
                  }],
                  subtext: `${current_tide.shift_rate} shift`,
                  // optimum_vis: [{
                  //   label: '',
                  //   type: 'linear',
                  //   min: optimals.tide.height.min,
                  //   max: optimals.tide.height.max,
                  //   mix_min: optimals.tide.height.mixed_min,
                  //   mix_max: optimals.tide.height.mixed_max,
                  //   opt_min: optimals.tide.height.optimal_min,
                  //   opt_max: optimals.tide.height.optimal_max,
                  //   value: this.state.data.current_tide_snapshot.height,
                  //   unit: "m",
                  //   roc_value: optimals.tide.height.in_3_hours,
                  //   roc: (optimals.tide.height.in_3_hours - this.state.data.current_tide_snapshot.height),
                  //   roc_direction: SpotUtil.getRocDirection(optimals.tide.height.in_3_hours - this.state.data.current_tide_snapshot.height),
                  // }]
                },
                {
                  title: 'Next tide',
                  indicator: '',
                  prefix: '',
                  values: [{
                    value: moment(this.state.forecasts.tides[this.state.selectedTime + 1].date_time).format("h:mm"),
                    unit: moment(this.state.forecasts.tides[this.state.selectedTime + 1].date_time).format("a"),
                  }],
                  subtext: moment(this.state.forecasts.tides[this.state.selectedTime + 1].date_time).fromNow(),
                  // optimum_vis: [
                  //
                  // ]
                }
              ]}
            />
          </div>
        : null}
        {this.state.selectedNavItem === this.state.navItems.indexOf('Forecast') ?
        <div id="forecast-section" className="row">
          <div className="small-12 medium-6 large-4 columns">
            <div id="forecast-graph-1" className="forecast-graph-container"/>
            <AreaGraph
              heightRatio={0.2}
              cssSelector='forecast-graph'
              targetId='forecast-graph-1'
              graphs={[
                {
                  yVals: [100, 50, 15, 30, 60, 100, 70, 60, 40, 80, 60, 100],
                  line: {
                    show: true,
                    opacity: 0.5,
                  },
                  area: {
                    show: true,
                    opacity: 0.25,
                  },
                  color: '#27AE60'
                },
                {
                  yVals: [30, 60, 20, 30, 80, 70, 65, 60, 10, 40, 50, 20],
                  line: {
                    show: true,
                    opacity: 0.5,
                  },
                  area: {
                    show: true,
                    opacity: 0.25,
                  },
                  color: '#27AE60'
                },
              ]}
            />
          </div>
          <div className="small-12 medium-6 large-4 columns">
            <div id="forecast-graph-2" className="forecast-graph-container"/>
            <AreaGraph
              heightRatio={0.2}
              cssSelector='forecast-graph'
              targetId='forecast-graph-2'
              graphs={[
                {
                  yVals: [100, 50, 15, 30, 60, 100, 70, 60, 40, 80, 60, 100],
                  line: {
                    show: true,
                    opacity: 0.5,
                  },
                  area: {
                    show: true,
                    opacity: 0.25,
                  },
                  color: '#27AE60'
                },
                {
                  yVals: [30, 60, 20, 30, 80, 70, 65, 60, 10, 40, 50, 20],
                  line: {
                    show: true,
                    opacity: 0.5,
                  },
                  area: {
                    show: true,
                    opacity: 0.25,
                  },
                  color: '#EB5757'
                },
              ]}
            />
          </div>
          <div className="small-12 medium-6 large-4 columns">
            <div id="forecast-graph-3" className="forecast-graph-container"/>
            <AreaGraph
              heightRatio={0.2}
              cssSelector='forecast-graph'
              targetId='forecast-graph-3'
              graphs={[
                {
                  yVals: [100, 50, 15, 30, 60, 100, 70, 60, 40, 80, 60, 100],
                  line: {
                    show: true,
                    opacity: 0.5,
                  },
                  area: {
                    show: true,
                    opacity: 0.25,
                  },
                  color: '#27AE60'
                },
              ]}
            />
          </div>
        </div>
        : null}
        {this.state.selectedNavItem === this.state.navItems.indexOf('About') ?
          <SpotAbout
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
