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
      spots: null
    };

    this.listSpots = this.listSpots.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleNameSearchChange = this.handleNameSearchChange.bind(this);
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

    if(this.state.searchQuery) {
      filteredSpots = filteredSpots.slice().filter(spot => {
        return (spot.name.toLowerCase().indexOf(this.state.searchQuery) >= 0 || spot.region.name.toLowerCase().indexOf(this.state.searchQuery) >= 0)
      });
    }

    return filteredSpots.map(spot => {
      return (<SpotTile spot={spot} key={spot.id} />);
    });
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

  render() {
    return (
      <Row>
        <Column widthMedium={12} widthLarge={10} isCentered>
          <h1>Surf now</h1>
          <select
            className="filter-select"
            onChange={this.handleRegionChange}
            value={this.state.regionValue}
          >
            <option value="">All regions</option>
            <option value="1">Mornington Peninsula</option>
            <option value="2">Surf Coast</option>
          </select>
          <input
            type="text"
            className="search"
            value={this.state.nameSearch}
            placeholder="Search spots"
            onChange={this.handleNameSearchChange}
          >
          </input>
        </Column>

        <Column className="spots-list small-expanded" widthMedium={12} widthLarge={10} isCentered>
          {this.renderLoader()}
          {this.listSpots()}
        </Column>
      </Row>
    );
  }
}

export default SpotsListContainer;