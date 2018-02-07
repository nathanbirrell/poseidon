import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NavigationTabs from 'components/NavigationTabs';
import Row from 'components/Row';
import PlaceholderShimmer from 'components/PlaceholderShimmer';
import GenericErrorMessage from 'components/GenericErrorMessage';

import * as SpotActions from 'actions/SpotActions';

class SpotHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navItems: [],
    };

    this.setNavItems = this.setNavItems.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
  }

  componentDidMount() {
    if (!this.props.spot.length) {
      this.props.dispatch(SpotActions.fetchSpot(this.props.match.params.spotId));
    }
    this.setNavItems();
  }

  componentWillReceiveProps(nextProps) {
    const routeChanged = this.props.match.url !== nextProps.match.url;
    if (routeChanged) { this.setNavItems(); }
  }

  setNavItems() {
    const routeMatchUrl = this.props.match.url;

    this.setState({
      navItems: [
        {
          name: 'Forecast',
          link: `${routeMatchUrl}/forecast`,
        },
        {
          name: 'Reports',
          link: `${routeMatchUrl}/reports`,
        },
        {
          name: 'About',
          link: `${routeMatchUrl}/about`,
        },
        {
          name: 'History',
          link: `${routeMatchUrl}/history`,
        },
      ],
    });
  }

  renderDetails() {
    if (this.props.isSyncing || !this.props.spot.name) {
      return (
        <div className="spot-header__details">
          <PlaceholderShimmer width="220px" height="16px" />
          <PlaceholderShimmer width="100px" height="12px" />
        </div>
      );
    }

    return (
      <div className="spot-header__details">
        <h1>{this.props.spot.name}</h1>
        <span>
          <a href={`/?region_id=${this.props.spot.region.id}`} className="btn --tag --icon --icon-map-pin--dark-secondary">{this.props.spot.region.name}</a>
          <a href="/" className="btn --tag --icon --icon-map-pin--dark-secondary">{this.props.spot.region.state}</a>
        </span>
      </div>
    );
  }

  render() {
    if (this.props.isError) {
      return <GenericErrorMessage reload={window.location.reload.bind(window.location)} />;
    }

    return (
      <div className="row spot-header">
        <Row withColumn className="spot-header__content small-12 cell text-left">
          {this.renderDetails()}
        </Row>
        <NavigationTabs
          isBusy={this.props.isSyncing}
          items={this.state.navItems}
        />
      </div>
    );
  }
}

SpotHeader.defaultProps = {
};

SpotHeader.propTypes = {
  spot: PropTypes.object.isRequired,
  isSyncing: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    spot: state.spot.data,
    isError: state.spot.isError,
    isSyncing: state.spot.isSyncing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(SpotActions, dispatch),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpotHeader);
