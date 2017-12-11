import React from 'react';
import PropTypes from 'prop-types';

import MathUtil from 'lib/MathUtil';
import SpotUtil from 'lib/SpotUtil';
import GoogleMapsStyles from 'lib/GoogleMapsStyles';

import Row from 'components/Row';
import Column from 'components/Column';

class SpotAboutContainer extends React.Component {
  render() {
    if (!this.props.spot) {
      // PUT LOADING STATE HERE
      return null;
    }

    const spot = this.props.spot;

    const mapIframeStyle = {
      border: '0'
    };

    return (
      <Row id="about-section">
        <Column widthMediumUp={12}>
          <h2>About {spot.name}</h2>
        </Column>
        <Column widthMediumUp={6}>
          <p>{spot.description}</p>
          <h3>Optimal conditions:</h3>

          <table>
            <tbody>
              <tr>
                <th></th>
                <th>Optimal min</th>
                <th>Optimal max</th>
              </tr>
              <tr>
                <td><strong>Swell size:</strong></td>
                <td>{spot.optimals.swell.size.optimal_min} m</td>
                <td>{spot.optimals.swell.size.optimal_max} m</td>
              </tr>
              <tr>
                <td><strong>Swell direction:</strong></td>
                <td>{spot.optimals.swell.direction.optimal_min} deg</td>
                <td>{spot.optimals.swell.direction.optimal_max} deg</td>
              </tr>
              <tr>
                <td><strong>Wind strength:</strong></td>
                <td>{spot.optimals.wind.speed.optimal_min} kph</td>
                <td>{spot.optimals.wind.speed.optimal_max} kph</td>
              </tr>
              <tr>
                <td><strong>Wind direction:</strong></td>
                <td>{spot.optimals.wind.direction.optimal_min} deg</td>
                <td>{spot.optimals.wind.direction.optimal_max} deg</td>
              </tr>
              <tr>
                <td><strong>Tide height:</strong></td>
                <td>{spot.optimals.tide.height.optimal_min} m</td>
                <td>{spot.optimals.tide.height.optimal_max} m</td>
              </tr>
            </tbody>
          </table>

          {/* <p><strong>Lat/long: </strong> {spot.latitude}, {spot.longitude}</p> */}
        </Column>
        <Column widthMediumUp={6}>
          <a className="btn --icon --icon-alert-triangle--white" href={`https://www.google.com.au/maps/dir//${spot.latitude},${spot.longitude}/`} target="_blank">
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
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDVFmco07GE43aqioYPI5Ccfl_DJlGkBJo&q=loc:${spot.latitude}+${spot.longitude}&zoom=15`}
              allowFullScreen>
            </iframe>
        </Column>
      </Row>
    );
  }
}

SpotAboutContainer.defaultProps = {
  spot: null,
};

SpotAboutContainer.PropTypes = {
  spot: PropTypes.object,
};

export default SpotAboutContainer;
