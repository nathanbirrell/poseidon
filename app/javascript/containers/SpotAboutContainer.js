import React from 'react';
import PropTypes from 'prop-types';

import MathUtil from 'lib/MathUtil';
import SpotUtil from 'lib/SpotUtil';

import Row from 'components/Row';
import Column from 'components/Column';
import GoogleMap from 'components/GoogleMap';
import Button from 'components/Button';
import Icon from 'components/Icon';

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
        <Column widthMediumUp={6}>
          <h2>About {spot.name}</h2>
        </Column>
        <Column widthMediumUp={6} style={{ display: 'flex' }}>
          <Button href={`https://www.google.com.au/maps/dir/${spot.latitude},${spot.longitude}/`} target="_blank">
            <Icon name="map--white" size={Icon.Size.LARGE} />
            Get directions
          </Button>

          <Button type={Button.Type.LINK} disabled>
            <Icon name="calendar" size={Icon.Size.LARGE} />
            Start plan
          </Button>

          <Button type={Button.Type.LINK} disabled>
            <Icon name="star" size={Icon.Size.LARGE} />
            Favourite
          </Button>
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
          <GoogleMap
            lat={spot.latitude}
            lng={spot.longitude}
          />
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
