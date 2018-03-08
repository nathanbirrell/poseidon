import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MathUtil from 'lib/MathUtil';
import SpotUtil from 'lib/SpotUtil';

import Row from 'core/components/Row';
import Column from 'core/components/Column';
import Spinner from 'core/components/Spinner';
import GoogleMap from 'core/components/GoogleMap';
import Button from 'core/components/Button';
import Icon from 'core/components/Icon';
import GenericErrorMessage from 'core/components/GenericErrorMessage';

import * as SpotActions from 'actions/SpotActions';

class SpotAboutContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(SpotActions.fetchSpot(this.props.match.params.spotId));
  }

  _renderOptimals() {
    const { spot } = this.props;
    const swellMin = MathUtil.round(SpotUtil.metresToFeet(spot.optimals.swell.size.optimal_min), 0);
    const swellMax = MathUtil.round(SpotUtil.metresToFeet(spot.optimals.swell.size.optimal_max), 0);
    const swellDirection = SpotUtil.degreesToText(spot.optimals.swell.direction.optimal);
    const windDirection = SpotUtil.degreesToText(spot.optimals.wind.direction.optimal);
    let tideHeight = `${spot.optimals.tide.height.optimal}m`;

    if (!spot.optimals.tide.height.optimal) { tideHeight = 'Any'; }

    return (
      <ul className="list --information-list">
        <li>
          <span className="item__primary">{swellMin}-{swellMax}<small>ft</small> <br /></span>
          <Icon name="activity" size={Icon.Size.MEDIUM} />
          Swell
        </li>
        <li>
          <span className="item__primary">{swellDirection}<br /></span>
          <Icon name="activity" size={Icon.Size.MEDIUM} />
          Swell direction
        </li>
        <li>
          <span className="item__primary">{windDirection} <br /></span>
          <Icon name="wind" size={Icon.Size.MEDIUM} />
          Wind
        </li>
        <li>
          <span className="item__primary">{tideHeight} <br /></span>
          <Icon name="moon" size={Icon.Size.MEDIUM} />
          Tide
        </li>
      </ul>
    );
  }

  _renderFeaturesWithIcons(features) {
    return features.map(feature => {
      if (!feature.friendly_name) { return null; }
      return (
        <li key={feature.friendly_name}>
          <span className="item__primary"><Icon name={feature.icon} size={Icon.Size.XLARGE} /><br /></span>
          <p>{feature.friendly_name}</p>
        </li>
      );
    });
  }

  _renderFeaturesWithoutIcons(features) {
    return features.map(feature => {
      if (!feature.friendly_name) { return null; }
      return (
        <li key={feature.friendly_name}>
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
    if (this.props.isError) {
      return <GenericErrorMessage reload={window.location.reload.bind(window.location)} />;
    }

    if (this.props.isSyncing || !this.props.spot) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }

    const { spot } = this.props;

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
};

SpotAboutContainer.propTypes = {
  spot: PropTypes.object.isRequired,
  isSyncing: PropTypes.bool.isRequired,
  isError: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (store) => {
  return {
    spot: store.spot.data,
    isError: store.spot.syncError,
    isSyncing: store.spot.isSyncing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(SpotActions, dispatch),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpotAboutContainer);
