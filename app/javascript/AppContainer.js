import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SpotsListContainer from 'containers/SpotsListContainer';
import SpotContainer from 'containers/SpotContainer';

class AppContainer extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={SpotsListContainer} exact />
          <Route path="/spots/:spotId" component={SpotContainer} />
          {/* TODO: follow the below convention for forecast/history/about */}
          {/* <Route path="/spots/:spotId/forecast" component={SpotForecastContainer} /> */}
        </div>
      </Router>
    );
  }
}

export default AppContainer;