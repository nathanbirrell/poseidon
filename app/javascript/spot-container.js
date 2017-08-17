import React from 'react';
import PropTypes from 'prop-types';

import SpotInfoCard from './spot-info-card-react';
import SpotTimeSlider from './spot-time-slider';
import SpotToolbar from './spot-toolbar';

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

    const mapIframeStyle = {
      border: '0'
    };

    return(
      <div>
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
        <div id="current-section">
          <SpotInfoCard
            title='Swell'
            secondary='secondary_here'
            rating={99}
            datetime={current_swell.date_time}
            data={[
              {
                title: 'Wave height',
                indicator: 'indicator_here',
                prefix: '',
                values: [{
                  value: current_swell.size,
                  unit: 'm',
                }],
                subtext: `@ ${current_swell.period}`,
                optimum_vis: [

                ]
              },
              {
                title: 'Direction',
                indicator: 'indicator_here',
                prefix: '',
                values: [{
                  value: current_swell.direction,
                  unit: '',
                }],
                subtext: `@ ${current_swell.direction}`,
                optimum_vis: [

                ]
              }
            ]}
          />
          <SpotInfoCard
            title='Wind'
            secondary='secondary_here'
            rating={99}
            datetime={current_wind.date_time}
            data={[
              {
                title: 'Wind speed',
                indicator: 'indicator_here',
                prefix: '',
                values: [{
                  value: current_wind.speed,
                  unit: 'kts',
                }],
                subtext: `${current_wind.speed} kph`,
                optimum_vis: [

                ]
              },
              {
                title: 'Direction',
                indicator: 'indicator_here',
                prefix: '',
                values: [{
                  value: current_wind.direction,
                  unit: '',
                }],
                subtext: `${current_wind.direction} deg`,
                optimum_vis: [

                ]
              }
            ]}
          />
          <SpotInfoCard title='Tide' />
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
