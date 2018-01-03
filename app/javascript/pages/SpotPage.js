import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Route, Redirect } from 'react-router-dom';
import { Element } from 'react-scroll';

import MathUtil from 'lib/MathUtil';
import SpotUtil from 'lib/SpotUtil';
import Api from 'lib/ApiUtil';
import UrlUtil from 'lib/UrlUtil';

import SpotAboutContainer from 'containers/SpotAboutContainer';
import SpotForecastContainer from 'containers/SpotForecastContainer';
import SpotDayContainer from 'containers/SpotDayContainer';
import SpotShareContainer from 'containers/SpotShareContainer';
import SpotCustomiseForecastContainer from 'containers/SpotCustomiseForecastContainer';

import Row from 'components/Row';
import Column from 'components/Column';
import SpotHeader from 'components/SpotHeader';
import SpotTimeSlider from 'components/SpotTimeSlider';
import SessionCard from 'components/SessionCard';
import GenericErrorMessage from 'components/GenericErrorMessage';

class SpotPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      spotId: null,
      selectedDateTime: this.initTime(),
      forecastConfig: {
        showOverallRating: true,
        showNightAndDay: true,
      },
      isError: false,
    };

    this.findForecastSeedFromTime = this.findForecastSeedFromTime.bind(this);
    this.updateSelectedDateTime = this.updateSelectedDateTime.bind(this);
    this.updateForecastConfig = this.updateForecastConfig.bind(this);
  }

  componentDidMount() {
    const { spotId } = this.props.match.params;
    let spot = Api.syncData(`/spots/${spotId}.json`);
    let forecasts = Api.syncData(`/spots/${spotId}/forecast/surf.json`);

    Promise.all([spot, forecasts]).then(values => {
      try {
        const spotJson = JSON.parse(values[0]);
        const forecastsJson = JSON.parse(values[1]);
        this.setState({
          spot: spotJson,
          forecasts: forecastsJson,
          isError: false,
        });
      } catch (error) {
        console.error(error);
        this.setState({ isError: true });
      }
    });

    this.setState({ spotId: spotId });
  }

  initTime() {
    let query = UrlUtil.searchParams.get('date_time');
    if (query !== null) {
      query = query.replace(/\s+/g, '+');
      const output = moment(query);
      if (output._isValid) {
        return output;
      }
    }
    return moment();
  }

  updateSelectedDateTime(datetime) {
    console.log('update datetime: ', datetime);
    this.setState({
      selectedDateTime: datetime
    });
  }

  findForecastSeedFromTime(data, time) {
    let value = null;
    var sortedResult = data.slice().sort(function(a, b) {
      var dA = Math.abs(moment(a.date_time).utc() - time),
        dB = Math.abs(moment(b.date_time).utc() - time);
      if (dA < dB) {
        return -1;
      } else if (dA > dB) {
        return 1;
      } else {
        return 0;
      }
    });
    value = data.indexOf(sortedResult[0]);
    console.log('Seed:', value, data[value], moment(data[value].date_time).format("dd hh:mm a"));
    return {
      value,
      time: data[value].date_time,
    };
  }

  updateForecastConfig(forecastConfig) {
    this.setState({
      forecastConfig
    });
  }

  render() {
    const routeMatchUrl = this.props.match.url;

    if (this.state.isError) {
      return <GenericErrorMessage reload={window.location.reload.bind(window.location)} />;
    }

    if (!this.state.spot || !this.state.forecasts) {
      return (
        <div>
          <SpotHeader isBusy matchUrl={this.props.match.url} />
          <SpotForecastContainer
            forecasts={this.state.forecasts}
          />
        </div>
      );
    }

    const date = this.state.selectedDateTime;
    // TODO: rename to selectedForecast ?? Discuss w/ TB. ie selectedForecast.index (instead of value), etc.
    const seed = this.findForecastSeedFromTime(this.state.forecasts.swells, date);

    console.log('selectedDateTime: ', date);

    const current_overall_rating = this.state.forecasts.overall_ratings[seed.value];

    let dateCopy = date.toDate();
    let startDate = moment(date).startOf('day');
    let endDate = moment(date).endOf('day');
    const sliderData = this.state.forecasts.overall_ratings.filter(item => moment(item.date_time).isBetween(startDate, endDate));

    // TODO: refactor all these into individual components/containers
    console.log(this.props.match.url);

    return (
      <div>
        <SpotHeader
          name={this.state.spot.name}
          region={this.state.spot.region}
          matchUrl={routeMatchUrl}
        />

        <Route path={`${routeMatchUrl}/forecast`} exact render={() => (
          <Row className="spot-page__forecast" withXPadding={false}>
            <Column widthSmall={12} widthMedium={12} widthLarge={12}>
              <Element name="forecast-graph-card">
                <SpotForecastContainer
                  spot={this.state.spot}
                  forecasts={this.state.forecasts}
                  updateParent={this.updateSelectedDateTime}
                  selectedDateTimePosition={seed.value}
                  forecastConfig={this.state.forecastConfig}
                />
              </Element>
            </Column>
            <Column widthMedium={6} widthLarge={4}>
              <SessionCard
                isExpanded
                rating={this.state.forecasts.overall_ratings[seed.value]}
                swell={this.state.forecasts.swells[seed.value]}
                wind={this.state.forecasts.winds[seed.value]}
                tide_current={this.state.forecasts.tides[seed.value]}
              />
            </Column>
            <Row withColumn>
              <SpotShareContainer
                selectedMoment={date}
                spotName={this.state.spot.name}
              />
              <SpotCustomiseForecastContainer
                forecastConfig={this.state.forecastConfig}
                updateParent={this.updateForecastConfig}
              />
            </Row>
          </Row>
        )} />

        <Route path={`${routeMatchUrl}/reports`} exact render={() => (
          <SpotDayContainer
            spot={this.state.spot}
            selectedTime={seed.value}
            forecasts={this.state.forecasts}
          />
        )} />

        <Route path={`${routeMatchUrl}/about`} exact render={() => (
          <SpotAboutContainer
            spot={this.state.spot}
          />
        )} />

        <Route path={`${routeMatchUrl}/history`} exact render={() => (
          <div id="history-section" className="grid-x">
            <div className="large-12 cell">
              <Row>
                <Column>
                  <h1>Coming soon</h1>
                </Column>
              </Row>
            </div>
          </div>
        )} />

        <Route path={`${routeMatchUrl}`} exact render={() => (
          <Redirect to={`${routeMatchUrl}/forecast`} />
        )} />

      </div>
    );
  }
}

SpotPage.propTypes = {
  match: PropTypes.object,
}

export default SpotPage;
