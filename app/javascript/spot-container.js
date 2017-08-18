import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import MathUtil from 'math-util.js';
import SpotUtil from 'spot-util.js';

import SpotBanner from './spot-banner';
import SpotToolbar from './spot-toolbar';
import SpotInfoCard from './spot-info-card-react';
import SpotTimeSlider from './spot-time-slider';

class SpotContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
    };

    this.syncData = this.syncData.bind(this);
  }

  componentDidMount() {
    let apiCall = this.syncData();
    apiCall.then((data) => {
      this.setState({
        data: JSON.parse(data),
      });
    });
  }

  syncData() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", window.location.href + '.json');
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  };

  render() {
    if (!this.state.data) {
      return null;
    }

    const current_swell = this.state.data.current_swell;
    const current_wind = this.state.data.current_wind;
    const optimals = this.state.data.optimals;

    const mapIframeStyle = {
      border: '0'
    };

    return(
      <div>
        <SpotBanner
          current_potential={MathUtil.round(this.state.data.current_potential, 0)}
          name={this.state.data.name}
          region_name='region_name'
          region_state='region_state'
        />
        <SpotToolbar items={[
          {
            id: 'current',
            label: 'Current',
          },
          {
            id: 'about',
            label: 'About',
          },
          {
            id: 'forecast',
            label: 'Forecast',
          },
          {
            id: 'history',
            label: 'History',
          }
        ]}/>
        <div id="current-section" className="row">
          <SpotInfoCard
            title='Swell'
            secondary={SpotUtil.swellFeetToDescription(SpotUtil.metresToFeet(current_swell.size))}
            rating={99}
            date_time={moment(current_swell.date_time).format("h:mm a")}
            data={[
              {
                title: 'Wave height',
                indicator: 'indicator_here',
                prefix: '',
                values: [{
                  value: MathUtil.round(SpotUtil.metresToFeet(current_swell.size), 1),
                  unit: 'ft',
                }],
                subtext: `@ ${MathUtil.round(current_swell.period, 1)} seconds`,
                optimum_vis: [{
                  label: '',
                  type: 'linear',
                  min: optimals.swell.size.min,
                  max: optimals.swell.size.max,
                  mix_min: optimals.swell.size.mixed_min,
                  mix_max: optimals.swell.size.mixed_max,
                  opt_min: optimals.swell.size.optimal_min,
                  opt_max: optimals.swell.size.optimal_max,
                  value: current_swell.size,
                  unit: "m",
                  roc_value: optimals.swell.size.in_3_hours,
                  roc: (optimals.swell.size.in_3_hours - current_swell.size),
                  roc_direction: SpotUtil.getRocDirection(optimals.swell.size.in_3_hours - current_swell.size),
                }]
              },
              {
                title: 'Direction',
                indicator: 'indicator_here',
                prefix: '',
                values: [{
                  value: SpotUtil.degreesToText(current_swell.direction),
                  unit: '',
                }],
                subtext: `${current_swell.direction} deg`,
                optimum_vis: [{
                  label: '',
                  type: 'direction',
                  min: optimals.swell.direction.min,
                  max: optimals.swell.direction.max,
                  mix_min: optimals.swell.direction.mixed_min,
                  mix_max: optimals.swell.direction.mixed_max,
                  opt_min: optimals.swell.direction.optimal_min,
                  opt_max: optimals.swell.direction.optimal_max,
                  value: current_swell.direction,
                  unit: "deg",
                  min_label: SpotUtil.degreesToText(optimals.swell.direction.min),
                  max_label: SpotUtil.degreesToText(optimals.swell.direction.max),
                  roc_value: optimals.swell.direction.in_3_hours,
                  roc: (optimals.swell.direction.in_3_hours - current_swell.direction),
                  roc_direction: SpotUtil.getRocDirection(optimals.swell.direction.in_3_hours - current_swell.direction),
                }]
              }
            ]}
          />
          <SpotInfoCard
            title='Wind'
            secondary={SpotUtil.windKphToDescription(current_wind.speed)}
            rating={99}
            date_time={moment(current_wind.date_time).format("h:mm a")}
            data={[
              {
                title: 'Wind speed',
                indicator: 'indicator_here',
                prefix: '',
                values: [{
                  value: MathUtil.round(SpotUtil.kphToKnots(current_wind.speed), 0),
                  unit: 'kts',
                }],
                subtext: `${current_wind.speed} kph`,
                optimum_vis: [{
                  label: '',
                  type: 'linear',
                  min: optimals.wind.speed.min,
                  max: optimals.wind.speed.max,
                  mix_min: optimals.wind.speed.mixed_min,
                  mix_max: optimals.wind.speed.mixed_max,
                  opt_min: optimals.wind.speed.optimal_min,
                  opt_max: optimals.wind.speed.optimal_max,
                  value: current_wind.speed,
                  unit: "kph",
                  roc_value: optimals.wind.speed.in_3_hours,
                  roc: (optimals.wind.speed.in_3_hours - current_wind.speed),
                  roc_direction: SpotUtil.getRocDirection(optimals.wind.speed.in_3_hours - current_wind.speed),
                }]
              },
              {
                title: 'Direction',
                indicator: 'indicator_here',
                prefix: '',
                values: [{
                  value:  SpotUtil.degreesToText(current_wind.direction),
                  unit: '',
                }],
                subtext: `${current_wind.direction} deg`,
                optimum_vis: [{
                  label: '',
                  type: 'direction',
                  min: optimals.wind.direction.min,
                  max: optimals.wind.direction.max,
                  mix_min: optimals.wind.direction.mixed_min,
                  mix_max: optimals.wind.direction.mixed_max,
                  opt_min: optimals.wind.direction.optimal_min,
                  opt_max: optimals.wind.direction.optimal_max,
                  value: current_wind.direction,
                  unit: "deg",
                  min_label: SpotUtil.degreesToText(optimals.wind.direction.min),
                  max_label: SpotUtil.degreesToText(optimals.wind.direction.max),
                  roc_value: optimals.wind.direction.in_3_hours,
                  roc: (optimals.wind.direction.in_3_hours - current_wind.direction),
                  roc_direction: SpotUtil.getRocDirection(optimals.wind.direction.in_3_hours - current_wind.direction),
                }]
              }
            ]}
          />
          <SpotInfoCard
            title='Tide'
            secondary={SpotUtil.tideDescription(this.state.data.last_tide_type)}
            rating={MathUtil.round(this.state.data.current_tide_rating, 0)}
            date_time={moment().format("h:mm a")}
            data={[
              {
                title: 'Tide height',
                indicator: SpotUtil.getVerdict(this.state.data.current_tide_rating),
                prefix: '',
                values: [{
                  value: this.state.data.current_tide_height,
                  unit: 'm',
                }],
                subtext: `${this.state.data.tide_shift_rate} shift`,
                optimum_vis: [{
                  label: '',
                  type: 'linear',
                  min: optimals.tide.height.min,
                  max: optimals.tide.height.max,
                  mix_min: optimals.tide.height.mixed_min,
                  mix_max: optimals.tide.height.mixed_max,
                  opt_min: optimals.tide.height.optimal_min,
                  opt_max: optimals.tide.height.optimal_max,
                  value: this.state.data.current_tide_height,
                  unit: "m",
                  roc_value: optimals.tide.height.in_3_hours,
                  roc: (optimals.tide.height.in_3_hours - this.state.data.current_tide_height),
                  roc_direction: SpotUtil.getRocDirection(optimals.tide.height.in_3_hours - this.state.data.current_tide_height),
                }]
              },
              {
                title: 'Next tide',
                indicator: '',
                prefix: '',
                values: [{
                  value: moment(this.state.data.next_tide.date_time).format("h:mm a"),
                  unit: '',
                }],
                subtext: moment(this.state.data.next_tide.date_time).fromNow(),
                optimum_vis: [

                ]
              }
            ]}
          />
        </div>
        <div id="about-section" className="row small-collapse medium-uncollapse">
          <div className="large-12 columns">
            <div className="small-12 columns">
              <h4>About</h4>
            </div>
            <div className="small-12 columns">
              <h5 className="subheader">{this.state.data.description}</h5>
              <h4>Optimal conditions:</h4>
              <p>
                <strong>Wind direction:</strong> {this.state.data.wind_optimal_direction_min} - {this.state.data.wind_optimal_direction_max} degrees
                <br />
                <strong>Wind strength:</strong> {this.state.data.wind_optimal_strength_min_kmh} - {this.state.data.wind_optimal_strength_max_kmh} kmh
                <br />
                <strong>Swell direction:</strong> {this.state.data.swell_optimal_direction_min} - {this.state.data.swell_optimal_direction_max} degrees
                <br />
                <strong>Swell size:</strong> {this.state.data.swell_optimal_size_min_metres} - {this.state.data.swell_optimal_size_max_metres} metres
                <br />
                <strong>Tides:</strong> {this.state.tide_optimal_min_metres} - {this.state.tide_optimal_max_metres} metres
                <br />
                <strong>Season:</strong> {this.state.data.season} <br />
                <strong>Lat/long: </strong> {this.state.data.latitude}, {this.state.data.longitude}
              </p>
            </div>
          </div>
          <div id="location-view" className="row">
            <div className="large-12 columns">
              <a className="btn --icon --icon-alert-triangle--white" href="https://www.google.com.au/maps/dir//<%= @spot.latitude %>,<%= @spot.longitude %>/" target="_blank">
                Get directions
              </a>
              <iframe
                width="100%"
                height="250"
                frameBorder="0"
                style={mapIframeStyle}
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDVFmco07GE43aqioYPI5Ccfl_DJlGkBJo&q=loc:${this.state.data.latitude}+${this.state.data.longitude}&zoom=15`}
                allowFullScreen>
              </iframe>
            </div>
          </div>
        </div>
        <div id="forecast-section" className="row">
          <div className="large-12 columns">
            <h3>FORECASTS COMING SOON</h3>
          </div>
        </div>
        <div id="history-section" className="row">
          <div className="large-12 columns">
            <h3>HISTORY COMING SOON</h3>
          </div>
        </div>
        <SpotTimeSlider />
      </div>
    );
  }
}

export default SpotContainer;
