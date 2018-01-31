import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';
import HomePage from 'pages/HomePage';
import SpotPage from 'pages/SpotPage';
import MarketingPage from 'pages/MarketingPage';

class AppContainer extends React.Component {
  render() {
    return (
      <ConnectedRouter history={this.props.browserHistory}>
        <div className="app-container">
          <Header />

          <main role="main" id="main-content" className="main" tabIndex="-1">
            {/* TODO: organise routes properly brah */}
            <Route path="/" component={HomePage} exact />
            <Route path="/spots/:spotId" component={SpotPage} />
            <Route path="/marketing" component={MarketingPage} />
            {/* TODO: follow the below convention for forecast/history/about */}
            {/* <Route path="/spots/:spotId/forecast" component={SpotForecastContainer} /> */}
          </main>

          <Footer />
        </div>
      </ConnectedRouter>
    );
  }
}

export default AppContainer;