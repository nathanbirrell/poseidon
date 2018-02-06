import React from 'react';
import PropTypes from 'prop-types';

import SpotUtil from 'lib/SpotUtil';
import NavigationTabs from 'components/NavigationTabs';
import Row from 'components/Row';
import PlaceholderShimmer from 'components/PlaceholderShimmer';
import Rating from 'components/Rating';

class SpotHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navItems: [],
    }

    this.isBusy = this.isBusy.bind(this);
    this.setNavItems = this.setNavItems.bind(this);
  }

  componentDidMount() {
    this.setNavItems();
  }

  componentWillReceiveProps(nextProps) {
    const routeChanged = this.props.matchUrl !== nextProps.matchUrl;
    if (routeChanged) { this.setNavItems(); }
  }

  setNavItems() {
    console.log(this.props.matchUrl);
    const routeMatchUrl = this.props.matchUrl;

    this.setState({
      navItems: [
        {
          name: 'Forecast',
          link: `${routeMatchUrl}/forecast`
        },
        {
          name: 'Reports',
          link: `${routeMatchUrl}/reports`
        },
        {
          name: 'About',
          link: `${routeMatchUrl}/about`
        },
        {
          name: 'History',
          link: `${routeMatchUrl}/history`
        },
      ],
    });
  }

  isBusy() {
    return this.props.isBusy || !this.props.name;
  }

  renderRating() {
    if (this.isBusy()) { return (<div className="spot-header__rating"></div>); }

    return (
      <div className="spot-header__rating">
        <Rating rating={this.props.current_potential} isLarge />
        <span className="rating-label">Surf Potential</span>
      </div>
    );
  }

  renderDetails() {
    if (this.isBusy()) {
      return (
        <div className="spot-header__details">
          <PlaceholderShimmer width='220px' height='16px' />
          <PlaceholderShimmer width='100px' height='12px' />
        </div>
      );
    }

    return (
      <div className="spot-header__details">
        <h1>{this.props.name}</h1>
        <span><a href={`/?region_id=${this.props.region.id}`} className="btn --tag --icon --icon-map-pin--dark-secondary">{this.props.region.name}</a>
        <a href="/" className="btn --tag --icon --icon-map-pin--dark-secondary">{this.props.region.state}</a></span>
      </div>
    );
  }

  render() {
    return (
      <div className={`row spot-header --${SpotUtil.getVerdict(this.props.current_potential)}`}>
        <Row withColumn className="spot-header__content small-12 cell text-left">
          {this.props.current_potential ? this.renderRating() : null}
          {this.renderDetails()}
        </Row>
        <NavigationTabs
          isBusy={this.isBusy()}
          items={this.state.navItems}
        />
      </div>
    );
  }
}

SpotHeader.defaultProps = {
  isBusy: false,
  current_potential: null,
  name: null,
  region: null,
  match: null,
};

SpotHeader.PropTypes = {
  current_potential: PropTypes.string,
  name: PropTypes.string,
  region_name: PropTypes.object,
  isBusy: PropTypes.bool,
  matchUrl: PropTypes.string.isRequired,
};

export default SpotHeader;
