import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SpotsListContainer from 'SpotsListContainer';
import SpotContainer from 'spot-container';

class AppContainer extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={SpotsListContainer} exact />
          <Route path="/spots/:spotId" component={SpotContainer} />
        </div>
      </Router>
    );
  }
}

export default AppContainer;