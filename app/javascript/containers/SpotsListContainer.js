import React from 'react';
import { Link } from 'react-router-dom';

import Api from 'lib/ApiUtil';
import UrlUtil from 'lib/UrlUtil';
import SessionCard from 'components/SessionCard';
import Row from 'components/Row';
import Column from 'components/Column';
import Spinner from 'components/Spinner';
import Icon from 'components/Icon';
import Button from 'components/Button';

class SpotsListContainer extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      spots: null,
      orderBy: "current_potential",
      ascending: false,
      isError: false,
    };

    this.listSpots = this.listSpots.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleNameSearchChange = this.handleNameSearchChange.bind(this);
    this.handleOrderByChange = this.handleOrderByChange.bind(this);
    this.toggleAscDesc = this.toggleAscDesc.bind(this);
    this.checkRegionUrlParam = this.checkRegionUrlParam.bind(this);
  }

  componentDidMount() {
    let spots = Api.syncData('/spots.json');

    spots.then(data => {
      try {
        data = JSON.parse(data);
        this.setState({
          spots: data,
          selectedRegion: this.checkRegionUrlParam(),
          isError: false,
        });
      } catch (error) {
        this.handleError();
      }
    });
  }

  handleError(data) {
    this.setState({ isError: true });
  }

  checkRegionUrlParam() {
    let query = UrlUtil.searchParams.get('region_id');
    if (query !== null && query > 0) {
      return query;
    }
  }

  listSpots() {
    if (!this.state.spots) return null;

    let filteredSpots = this.state.selectedRegion ?
      this.state.spots.filter(spot => {
        return spot.region_id == this.state.selectedRegion
      }) : this.state.spots;

    if (this.state.searchQuery) {
      filteredSpots = filteredSpots.slice().filter(spot => {
        return (spot.name.toLowerCase().indexOf(this.state.searchQuery) >= 0 || spot.region.name.toLowerCase().indexOf(this.state.searchQuery) >= 0)
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
              tide_next={spot.next_tide}
              highlight={this.state.orderBy}
            />
          </Link>

      );
    });
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

  orderSpots(spots, orderBy) {
    const orderLevels = orderBy.split('.');
    const output = spots.sort((a, b) => {
      let  Ametric = this.getChildPropertyRecursively(a, orderLevels);
      let Bmetric = this.getChildPropertyRecursively(b, orderLevels);
      return this.state.ascending ? Ametric - Bmetric : Bmetric - Ametric;
    });
    return output;
  }

  renderLoader() {
    if (!this.state.spots && !this.state.isError) return (
      <Spinner />
    );
  }

  renderError() {
    if (!this.state.isError) return;
    return (
      <Row withColumn className="text-center">
        <h2>Oops, something went wrong!</h2>

        <Button onClick={window.location.reload}>Try again</Button> <br />

        Or, please <a href="mailto:surfposeidon@gmail.com">let us know</a> if it persists.
      </Row>
    );
  }

  handleRegionChange(event) {
    this.setState({
      selectedRegion: event.target.value
    });
  }

  handleNameSearchChange(event) {
    this.setState({
      searchQuery: event.target.value.toLowerCase()
    });
  }

  handleOrderByChange(event) {
    this.setState({
      orderBy: event.target.value
    });
  }

  toggleAscDesc() {
    this.setState({
      ascending: !this.state.ascending
    });
  }

  render() {
    if (this.state.isError) {
      return this.renderError();
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
                >
                </input>
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
              <button className={"btn --icon --slim " + (this.state.ascending ? "--icon-chevron-up--white" : "--icon-chevron-down--white")} onClick={this.toggleAscDesc}>
                <span className="show-for-medium">{this.state.ascending ? "Asc." : "Desc."}</span>
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

export default SpotsListContainer;