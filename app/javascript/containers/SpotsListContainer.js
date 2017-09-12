import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Api from 'lib/ApiUtil';
import SpotTile from 'components/SpotTile';

class SpotsListContainer extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      spots: null
    };

    this.listSpots = this.listSpots.bind(this);
  }

  componentDidMount() {
    let spots = Api.syncData('/spots.json');

    spots.then(data => {
      data = JSON.parse(data);
      this.setState({ spots: data });
    });
  }

  listSpots() {
    return this.state.spots.map(spot => {
      return (<SpotTile spot={spot} key={spot.id} />);
    });
  }

  render() {
    if (!this.state.spots) return (<h1>'Loading...'</h1>);
    return (
      <div className='row'>
        <div className='medium-8 columns'>
          <h1>Surf now</h1>
          {this.listSpots()}
        </div>
      </div>
    );
  }
}

export default SpotsListContainer;