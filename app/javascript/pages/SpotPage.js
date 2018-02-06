import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import SpotAboutContainer from 'containers/SpotAboutContainer';
import SpotDayContainer from 'containers/SpotDayContainer';

import SurfForecastContainer from 'modules/forecast/containers/SurfForecast';

import Row from 'components/Row';
import Column from 'components/Column';
// import SpotHeader from 'components/SpotHeader';
import GenericErrorMessage from 'components/GenericErrorMessage';

class SpotPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
    };
  }

  render() {
    console.log('rendering');  
    const routeMatchUrl = this.props.match.url;

    if (this.state.isError) {
      return <GenericErrorMessage reload={window.location.reload.bind(window.location)} />;
    }

    // if (!this.state.spot || !this.state.forecasts) {
    //   return (
    //     <div>
    //       <SpotHeader isBusy matchUrl={this.props.match.url} />
    //     </div>
    //   );
    // }

    // TODO: refactor all these into individual components/containers

    return (
      <div>
        {/* <SpotHeader
          name={this.state.spot.name}
          region={this.state.spot.region}
          matchUrl={routeMatchUrl}
        /> */}

        <Route
          path={`${routeMatchUrl}/forecast`}
          exact
          render={() => (
            <SurfForecastContainer match={this.props.match} />
          )}
        />

        <Route
          path={`${routeMatchUrl}/reports`}
          exact
          render={() => (
            <SpotDayContainer
              spot={this.state.spot}
            />
          )}
        />

        <Route
          path={`${routeMatchUrl}/about`}
          exact
          render={() => (
            <SpotAboutContainer
              spot={this.state.spot}
            />
          )}
        />

        <Route
          path={`${routeMatchUrl}/history`}
          exact
          render={() => (
            <div id="history-section" className="grid-x">
              <div className="large-12 cell">
                <Row>
                  <Column>
                    <h1>Coming soon</h1>
                  </Column>
                </Row>
              </div>
            </div>
          )}
        />

        <Route
          path={`${routeMatchUrl}`}
          exact
          render={() => (
            <Redirect to={`${routeMatchUrl}/forecast`} />
          )}
        />

      </div>
    );
  }
}

SpotPage.defaultProps = {
  match: null,
};

SpotPage.propTypes = {
  match: PropTypes.object,
};

export default SpotPage;
