import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Api from 'lib/ApiUtil';
import SpotTile from 'components/SpotTile';
import Row from 'components/Row';
import Column from 'components/Column';
import Spinner from 'components/Spinner';

class SpotsListContainer extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      spots: null,
      orderBy: "current_potential",
      ascending: false 
    };

    this.listSpots = this.listSpots.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleNameSearchChange = this.handleNameSearchChange.bind(this);
    this.handleOrderByChange = this.handleOrderByChange.bind(this);
    this.toggleAscDesc = this.toggleAscDesc.bind(this);
  }

  componentDidMount() {
    let spots = Api.syncData('/spots.json');

    spots.then(data => {
      data = JSON.parse(data);
      this.setState({ spots: data });
    });
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
      return (<SpotTile spot={spot} highlight={this.state.orderBy} key={spot.id} />);
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
    if (!this.state.spots) return (
      <Spinner />
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
    return (
      <div>
        <Row>
          <Column className="spots-list small-expanded" widthMedium={12} widthLarge={10} isCentered>
            <h1>Surf now</h1>
          </Column>
        </Row>
        <Row>
          <Column className="spots-list small-expanded" widthMedium={12} widthLarge={10} isCentered>
            <div className="input-holder --icon --icon-map-pin--dark-secondary --clickable">
              <select
                className="filter-select"
                onChange={this.handleRegionChange}
                value={this.state.regionValue}
              >
                <option value="">All regions</option>
                <option value="1">Mornington Peninsula</option>
                <option value="2">Surf Coast</option>
              </select>
            </div>
          </Column>
        </Row>
        <Row>
          <Column className="spots-list small-expanded" widthSmall={6} widthMedium={6} widthLarge={4} isCentered>
            <div className="input-holder --icon --icon-align-right--dark-secondary --clickable">
              <select
                className="filter-select"
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
            <button className={"btn --icon --slim " + (this.state.ascending ? "--icon-chevron-up--white" : "--icon-chevron-down--white")} onClick={this.toggleAscDesc}>{this.state.ascending ? "Asc." : "Desc."}</button>
          </Column>
        </Row>
        <Row>
          <Column className="spots-list small-expanded" widthMedium={12} widthLarge={10} isCentered>
            <div className="input-holder --icon --icon-search--dark-secondary">
              <input
                type="text"
                className="search"
                value={this.state.nameSearch}
                placeholder="Search spots"
                onChange={this.handleNameSearchChange}
              >
              </input>
            </div>
          </Column>
        </Row>
        <Row>
          <Column className="spots-list small-expanded" widthMedium={12} widthLarge={10} isCentered>
            {this.renderLoader()}
            {this.listSpots()}
          </Column>
        </Row>
      </div>
    );
  }
}

export default SpotsListContainer;