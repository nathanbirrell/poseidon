import React from 'react';
import PropTypes from 'prop-types';

import SpotUtil from 'lib/SpotUtil';
import PlaceholderShimmer from 'components/PlaceholderShimmer';
import Rating from 'components/Rating';

class SpotBanner extends React.Component {
  constructor(props) {
    super(props);
    this.isBusy = this.isBusy.bind(this);
  }

  isBusy() {
    return this.props.isBusy || !this.props.name;
  }

  renderRating() {
    if (this.isBusy()) { return (<div className="spot-banner__rating"></div>); }

    return (
      <div className="spot-banner__rating">
        <Rating rating={this.props.current_potential} isLarge />
        <span className="rating-label">Surf Potential</span>
      </div>
    );
  }

  renderDetails() {
    if (this.isBusy()) {
      return (
        <div className="spot-banner__details">
          <PlaceholderShimmer width='220px' height='16px' />
          <PlaceholderShimmer width='100px' height='12px' />
        </div>
      );
    }

    return (
      <div className="spot-banner__details">
        <h1>{this.props.name}</h1>
        <span><a href={`/regions/${this.props.region.id}`}>{this.props.region.name}</a>, <a href="#">{this.props.region.state}</a></span>
      </div>
    );
  }

  render() {
    return (
      <div className={`row spot-banner --${SpotUtil.getVerdict(this.props.current_potential)}`}>
        <div className="spot-banner__content small-12 cell text-left">
          {this.renderRating()}
          {this.renderDetails()}
        </div>
      </div>
    );
  }
}

SpotBanner.defaultProps = {
  isBusy: false,
  current_potential: null,
  name: null,
  region: null,
};

SpotBanner.PropTypes = {
  current_potential: PropTypes.string,
  name: PropTypes.string,
  region_name: PropTypes.object,
  isBusy: PropTypes.bool,
};

export default SpotBanner;
