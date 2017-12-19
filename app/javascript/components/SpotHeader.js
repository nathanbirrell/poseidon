import React from 'react';
import PropTypes from 'prop-types';

import SpotUtil from 'lib/SpotUtil';
import NavigationTabs from 'components/NavigationTabs';
import Row from 'components/Row';
import PlaceholderShimmer from 'components/PlaceholderShimmer';

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

  isBusy() {
    return this.props.isBusy || !this.props.name;
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
      ]
    });
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
      <div className={`row spot-header}`}>
        <NavigationTabs
          isBusy={this.isBusy()}
          items={this.state.navItems}
          titleArea={
            <Row withColumn className="spot-header__content small-12 cell text-left">
              {this.renderDetails()}
            </Row>
          }
        />
      </div>
    );
  }
}

SpotHeader.defaultProps = {
  isBusy: false,
  name: null,
  region: null,
  match: null,
};

SpotHeader.PropTypes = {
  name: PropTypes.string,
  region_name: PropTypes.object,
  isBusy: PropTypes.bool,
  matchUrl: PropTypes.string.isRequired,
};

export default SpotHeader;
