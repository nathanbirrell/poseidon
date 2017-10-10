import React from 'react';
import PropTypes from 'prop-types';

import MathUtil from 'lib/MathUtil';
import SpotUtil from 'lib/SpotUtil';

class SpotAboutContainer extends React.Component {
  render() {
    if (!this.props.data) {
      // PUT LOADING STATE HERE
      return null;
    }

    const data = this.props.data;

    const mapIframeStyle = {
      border: '0'
    };

    return (
      <div id="about-section" className="row small-collapse medium-uncollapse">
        <div className="large-12 cell">
          <div className="small-12 cell">
            <h4>Description</h4>
          </div>
          <div className="small-12 cell">
            <h5 className="subheader">{data.description}</h5>
            <h4>Optimal conditions:</h4>
            <table>
              <tbody>
                <tr>
                  <th>Factor</th>
                  <th>Optimal min</th>
                  <th>Optimal max</th>
                </tr>
                <tr>
                  <td><strong>Swell size:</strong></td>
                  <td>{data.optimals.swell.size.optimal_min} m</td>
                  <td>{data.optimals.swell.size.optimal_max} m</td>
                </tr>
                <tr>
                  <td><strong>Swell direction:</strong></td>
                  <td>{data.optimals.swell.direction.optimal_min} deg</td>
                  <td>{data.optimals.swell.direction.optimal_max} deg</td>
                </tr>
                <tr>
                  <td><strong>Wind strength:</strong></td>
                  <td>{data.optimals.wind.speed.optimal_min} kph</td>
                  <td>{data.optimals.wind.speed.optimal_max} kph</td>
                </tr>
                <tr>
                  <td><strong>Wind direction:</strong></td>
                  <td>{data.optimals.wind.direction.optimal_min} deg</td>
                  <td>{data.optimals.wind.direction.optimal_max} deg</td>
                </tr>
                <tr>
                  <td><strong>Tide height:</strong></td>
                  <td>{data.optimals.tide.height.optimal_min} m</td>
                  <td>{data.optimals.tide.height.optimal_max} m</td>
                </tr>
              </tbody>
            </table>
            <p><strong>Season:</strong> {data.season}</p>
            <p><strong>Lat/long: </strong> {data.latitude}, {data.longitude}</p>
          </div>
        </div>
        <div id="location-view" className="grid-x">
          <div className="large-12 cell">
            <a className="btn --icon --icon-alert-triangle--white" href="https://www.google.com.au/maps/dir//<%= @spot.latitude %>,<%= @spot.longitude %>/" target="_blank">
              Get directions
            </a>
            <a className="btn --secondary --icon --icon-calendar--blue" href="#" target="_blank">
              Start a plan
            </a>
            <iframe
              width="100%"
              height="250"
              frameBorder="0"
              style={mapIframeStyle}
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDVFmco07GE43aqioYPI5Ccfl_DJlGkBJo&q=loc:${data.latitude}+${data.longitude}&zoom=15`}
              allowFullScreen>
            </iframe>
          </div>
        </div>
      </div>
    );
  }
}

SpotAboutContainer.defaultProps = {
  data: null,
};

SpotAboutContainer.PropTypes = {
  data: PropTypes.object,
};

export default SpotAboutContainer;
