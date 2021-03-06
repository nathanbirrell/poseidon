import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import SurfForecastContainer from 'modules/forecast/containers/ForecastContainer';
import SpotReportsContainer from 'modules/reports';
import SpotAboutContainer from 'modules/about';

import Row from 'core/components/Row';
import Column from 'core/components/Column';
import GenericErrorMessage from 'core/components/GenericErrorMessage';

import SpotHeader from 'modules/spot/containers/SpotHeader';

class SpotPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
    };
  }

  render() {
    const routeMatchUrl = this.props.match.url;

    if (this.state.isError) {
      return <GenericErrorMessage reload={window.location.reload.bind(window.location)} />;
    }

    // TODO: refactor all these into individual components/containers

    return (
      <div>
        <SpotHeader
          match={this.props.match}
        />

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
            <SpotReportsContainer match={this.props.match} />
          )}
        />

        <Route
          path={`${routeMatchUrl}/about`}
          exact
          render={() => (
            <SpotAboutContainer match={this.props.match} />
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
