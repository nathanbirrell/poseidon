import React from 'react';
import PropTypes from 'prop-types';

import MathUtil from 'lib/MathUtil';
import SpotUtil from 'lib/SpotUtil';

import Row from 'components/Row';
import Column from 'components/Column';
import GoogleMap from 'components/GoogleMap';
import Button from 'components/Button';
import Icon from 'components/Icon';

import { Keys, Values } from 'lib/SpotFeatures';

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

  _renderFeaturesWithIcons(features) {
    return features.map((feature, index) => {
      if (!feature.friendly_name) { return null; }
      return (
        <li key={index}>
          <span className="item__primary"><Icon name={feature.icon} size={Icon.Size.XLARGE} /><br /></span>
          <p>{feature.friendly_name}</p>
        </li>
      );
    });
  }

  _renderFeaturesWithoutIcons(features) {
    return features.map((feature, index) => {
      if (!feature.friendly_name) { return null; }
      return (
        <li key={index}>
          <Icon name="check-circle" />
          {feature.friendly_name}
        </li>
      );
    });
  }

  _renderFeatures(data) {
    if (!this.props.spot.features.length) { return null; }
    return (
      <div>
        <h3>Other notes:</h3>
        <ul className="list --information-list text-center">
          {this._renderFeaturesWithIcons(data.filter((feature) => feature.icon))}
        </ul>
        <ul className="list --plain --color-secondary">
          {this._renderFeaturesWithoutIcons(data.filter((feature) => !feature.icon))}
        </ul>
      </div>
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
          <Button href={`https://www.google.com.au/maps/dir//${spot.latitude},${spot.longitude}/`} target="_blank">
            <Icon name="map--white" size={Icon.Size.LARGE} />
            Go
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

          {this._renderFeatures(this.props.spot.features)}

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
