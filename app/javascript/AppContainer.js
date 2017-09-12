import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import SpotPage from 'pages/SpotPage';

class AppContainer extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={HomePage} exact />
          <Route path="/spots/:spotId" component={SpotPage} />
          {/* TODO: follow the below convention for forecast/history/about */}
          {/* <Route path="/spots/:spotId/forecast" component={SpotForecastContainer} /> */}
        </div>
      </Router>
    );
  }
}

export default AppContainer;