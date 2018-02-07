import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import UrlUtil from 'lib/UrlUtil';
import SessionCard from 'core/components/SessionCard';
import Row from 'core/components/Row';
import Column from 'core/components/Column';
import Spinner from 'core/components/Spinner';
import Icon from 'core/components/Icon';
import GenericErrorMessage from 'core/components/GenericErrorMessage';

import * as SpotListActions from 'actions/SpotListActions';

class SpotsListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderBy: 'current_potential',
      ascending: false,
    };

    this.listSpots = this.listSpots.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleNameSearchChange = this.handleNameSearchChange.bind(this);
    this.handleOrderByChange = this.handleOrderByChange.bind(this);
    this.toggleAscDesc = this.toggleAscDesc.bind(this);
    this.checkRegionUrlParam = this.checkRegionUrlParam.bind(this);
  }

  componentDidMount() {
    if (!this.props.spots.length) {
      this.props.dispatch(SpotListActions.fetchSpots());
    }
  }

  getChildPropertyRecursively(object, keys) {
    let output;
    const childProp = object[keys[0]];
    if (keys.length > 1) {
      const nextChildProp = this.getChildPropertyRecursively(childProp, keys.slice().splice(1));
      output = nextChildProp;
    } else {
      output = childProp;
    }
    return output;
  }

  listSpots() {
    if (!this.props.spots) return null;

    let filteredSpots = this.state.selectedRegion ?
      this.props.spots.filter(spot => {
        return spot.region_id === this.state.selectedRegion;
      }) : this.props.spots;

    if (this.state.searchQuery) {
      filteredSpots = filteredSpots.slice().filter(spot => {
        return (spot.name.toLowerCase().indexOf(this.state.searchQuery) >= 0 || spot.region.name.toLowerCase().indexOf(this.state.searchQuery) >= 0);
      });
    }

    filteredSpots = this.orderSpots(filteredSpots, this.state.orderBy);

    return filteredSpots.map(spot => {
      const link = `/spots/${spot.id}/forecast`;

      return (

        <Link to={link} key={spot.id}>
          <SessionCard
            spot={spot}
            rating={{
              date_time: spot.current_model_date_time,
              rating: spot.current_potential,
            }}
            swell={spot.current_swell}
            wind={spot.current_wind}
            tide_current={spot.current_tide_snapshot}
            highlight={this.state.orderBy}
          />
        </Link>

      );
    });
  }

  checkRegionUrlParam() {
    const query = UrlUtil.searchParams.get('region_id');
    if (query !== null && query > 0) {
      return query;
    }

    return undefined;
  }

  orderSpots(spots, orderBy) {
    const orderLevels = orderBy.split('.');
    const output = spots.sort((a, b) => {
      const Ametric = this.getChildPropertyRecursively(a, orderLevels);
      const Bmetric = this.getChildPropertyRecursively(b, orderLevels);
      return this.state.ascending ? Ametric - Bmetric : Bmetric - Ametric;
    });
    return output;
  }

  handleRegionChange(event) {
    this.setState({
      selectedRegion: event.target.value,
    });
  }

  handleNameSearchChange(event) {
    this.setState({
      searchQuery: event.target.value.toLowerCase(),
    });
  }

  handleOrderByChange(event) {
    this.setState({
      orderBy: event.target.value,
    });
  }

  toggleAscDesc() {
    this.setState({
      ascending: !this.state.ascending,
    });
  }

  renderLoader() {
    if (this.props.isSyncing) {
      return (
        <Spinner />
      );
    }

    return null;
  }

  render() {
    if (this.props.isError) {
      return <GenericErrorMessage reload={window.location.reload.bind(window.location)} />;
    }

    return (
      <Row className="spots-list-container">
        <Column widthMedium={10} offsetMedium={1} widthLarge={12} offsetLarge={0}>
          <Row>
            <Column widthMedium={12} widthLarge={10}>
              <h1 className="show-for-sr">Surf now</h1>
            </Column>
          </Row>

          <Row>
            <Column widthMedium={12} widthLarge={4}>
              <div className="input-holder --icon">
                <Icon name="search--dark-secondary" size={Icon.Size.LARGE} />
                <input
                  type="text"
                  className="search input"
                  value={this.state.nameSearch}
                  placeholder="Search spots"
                  onChange={this.handleNameSearchChange}
                />
              </div>
            </Column>

            <Column widthSmall={12} widthMedium={6} widthLarge={4}>
              <div className="input-holder --icon --clickable">
                <Icon name="map-pin--dark-secondary" size={Icon.Size.LARGE} />
                <select
                  className="input"
                  onChange={this.handleRegionChange}
                  value={this.state.selectedRegion}
                >
                  <option value="">All regions</option>
                  <option value="1">Mornington Peninsula</option>
                  <option value="2">Surf Coast</option>
                </select>
              </div>
            </Column>
            <Column className="flex-space-between" widthSmall={12} widthMedium={6} widthLarge={4}>
              <div className="input-holder --icon --clickable">
                <Icon name="align-right--dark-secondary" size={Icon.Size.LARGE} />
                <select
                  className="input"
                  onChange={this.handleOrderByChange}
                  value={this.state.orderByValue}
                >
                  <option value="current_potential">Overall rating</option>
                  <option value="current_swell.rating">Swell rating</option>
                  <option value="current_swell.size">Swell size</option>
                  <option value="current_wind.rating">Wind rating</option>
                  <option value="current_wind.speed">Wind speed</option>
                </select>
              </div>
              <button className={`btn --icon --slim ${this.state.ascending ? '--icon-chevron-up--white' : '--icon-chevron-down--white'}`} onClick={this.toggleAscDesc}>
                <span className="show-for-medium">{this.state.ascending ? 'Asc.' : 'Desc.'}</span>
              </button>
            </Column>
          </Row>

          <Row>
            <Column className="spots-list" widthMedium={12} widthLarge={12}>
              {this.renderLoader()}
              {this.listSpots()}
            </Column>
          </Row>
        </Column>
      </Row>
    );
  }
}

SpotsListContainer.defaultProps = {
};

SpotsListContainer.propTypes = {
  spots: PropTypes.array.isRequired,
  isSyncing: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    spots: state.spots.data,
    isError: state.spots.isError,
    isSyncing: state.spots.isSyncing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(SpotListActions, dispatch),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpotsListContainer);