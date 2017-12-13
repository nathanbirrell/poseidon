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
  _renderOptimals() {
    const { spot } = this.props;
    const swell_min = MathUtil.round(SpotUtil.metresToFeet(spot.optimals.swell.size.optimal_min), 0);
    const swell_max = MathUtil.round(SpotUtil.metresToFeet(spot.optimals.swell.size.optimal_max), 0);
    const swell_direction = SpotUtil.degreesToText(spot.optimals.swell.direction.optimal);
    const wind_direction = SpotUtil.degreesToText(spot.optimals.wind.direction.optimal);
    let tide_height = `${spot.optimals.tide.height.optimal}m`;

    if (!spot.optimals.tide.height.optimal) { tide_height = 'Any'; }

    return (
      <ul className="list --information-list">
        <li>
          <span className="item__primary">{swell_min}-{swell_max}<small>ft</small> <br /></span>
          <Icon name="activity" size={Icon.Size.MEDIUM} />
          Swell
        </li>
        <li>
          <span className="item__primary">{swell_direction}<br /></span>
          <Icon name="activity" size={Icon.Size.MEDIUM} />
          Swell direction
        </li>
        <li>
          <span className="item__primary">{wind_direction} <br /></span>
          <Icon name="wind" size={Icon.Size.MEDIUM} />
          Wind
        </li>
        <li>
          <span className="item__primary">{tide_height} <br /></span>
          <Icon name="moon" size={Icon.Size.MEDIUM} />
          Tide
        </li>
      </ul>
    );
  }

  _renderNotes() {
    const { spot } = this.props;

    return (
      <ul className="list --information-list text-center">
        <li>
          <span className="item__primary"><Icon name="heart" size={Icon.Size.XLARGE} /><br /></span>
          <p>Beginner friendly</p>
        </li>
        <li>
          <span className="item__primary"><Icon name="activity" size={Icon.Size.XLARGE} /><br /></span>
          <p>Left-handers</p>
        </li>
        <li>
          <span className="item__primary"><Icon name="users" size={Icon.Size.XLARGE} /><br /></span>
          <p>Low crowds</p>
        </li>
        <li>
          <span className="item__primary"><Icon name="map-pin" size={Icon.Size.XLARGE} /><br /></span>
          <p>Easy access</p>
        </li>
      </ul>
    );
  }

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
      <Row className="spot-page__about">
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

          {this._renderOptimals()}

          <h3>Other notes:</h3>

          {this._renderNotes()}
          <small>TODO: build this out properly (NOT REAL DATA)</small>

          {/* <p><strong>Lat/long: </strong> {spot.latitude}, {spot.longitude}</p> */}
        </Column>
        <Column widthMediumUp={6}>
          <GoogleMap
            lat={spot.latitude}
            lng={spot.longitude}
          />
        </Column>
        <Column widthMediumUp={12}>
          <small>todo: instagram location embed</small>
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
