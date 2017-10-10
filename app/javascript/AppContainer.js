import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MomentConfig from 'config/MomentConfig';
import Header from 'components/Header';
import Footer from 'components/Footer';
import HomePage from 'pages/HomePage';
import SpotPage from 'pages/SpotPage';

MomentConfig();

class AppContainer extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header />

          <main role="main" id="main-content" className="" tabIndex="-1">
            {/* TODO: organise routes properly brah */}
            <Route path="/" component={HomePage} exact />
            <Route path="/spots/:spotId" component={SpotPage} />
            {/* TODO: follow the below convention for forecast/history/about */}
            {/* <Route path="/spots/:spotId/forecast" component={SpotForecastContainer} /> */}
          </main>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default AppContainer;