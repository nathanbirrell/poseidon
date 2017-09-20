import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SpotContainer from 'spot-container';

class AppContainer extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/spots/:spotId" component={SpotContainer} />
      </Router>
    );
  }
}

export default AppContainer;