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

    return this.state.spots.map(spot => {
      return (<SpotTile spot={spot} key={spot.id} />);
    });
  }

  renderLoader() {
    if (!this.state.spots) return (
      <Spinner />
    );
  }

  render() {
    return (
      <Row>
        <Column widthMedium={10} isCentered>
          <h1>Surf now</h1>
          {this.renderLoader()}
        </Column>
        {this.listSpots()}
      </Row>
    );
  }
}

export default SpotsListContainer;