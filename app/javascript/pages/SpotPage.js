import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Route } from 'react-router-dom';

import MathUtil from 'lib/MathUtil';
import SpotUtil from 'lib/SpotUtil';
import Api from 'lib/ApiUtil';
import UrlUtil from 'lib/UrlUtil';

import SpotAboutContainer from 'containers/SpotAboutContainer';
import SpotForecastContainer from 'containers/SpotForecastContainer';
import SpotDayContainer from 'containers/SpotDayContainer';
import SpotShareContainer from 'containers/SpotShareContainer';

import Row from 'components/Row';
import Column from 'components/Column';
import SpotHeader from 'components/SpotHeader';
import SpotTimeSlider from 'components/SpotTimeSlider';
import SessionCard from 'components/SessionCard';

class SpotPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      spotId: null,
      selectedDateTime: this.initTime(),
    };

    this.findForecastSeedFromTime = this.findForecastSeedFromTime.bind(this);
    this.updateSelectedDateTime = this.updateSelectedDateTime.bind(this);
  }

  componentDidMount() {
    const { spotId } = this.props.match.params;
    let spot = Api.syncData(`/spots/${spotId}.json`);
    let forecasts = Api.syncData(`/spots/${spotId}/forecasts.json`);

    Promise.all([spot, forecasts]).then(values => {
      const spotJson = JSON.parse(values[0]);
      const forecastsJson = JSON.parse(values[1]);
      this.setState({
        spot: spotJson,
        forecasts: forecastsJson,
      });
    });

    this.setState({ spotId: spotId });
  }

  initTime() {
    let query = UrlUtil.searchParams.get('date_time');
    if (query !== null) {
      query = query.replace(/\s+/g, '+');
      const output = moment(query);
      console.log('query', query, output);
      if (output._isValid) {
        console.log('URL Query is valid', output);
        return output;
      }
    }
    return moment();
  }

  updateSelectedDateTime(datetime) {
    console.log('update datetime: ', datetime);
    this.setState({
      selectedDateTime: datetime,
      seedTime: null,
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

  render() {
    if (!this.state.spot || !this.state.forecasts) {
      return (
        <SpotHeader isBusy />
      );
    }

    const routeMatchUrl = this.props.match.url;
    const date = this.state.selectedDateTime;
    // TODO: rename to selectedForecast ?? Discuss w/ TB. ie selectedForecast.index (instead of value), etc.
    const seed = this.findForecastSeedFromTime(this.state.forecasts.swells, date);

    console.log('selectedDateTime: ', date);

    const current_overall_rating = this.state.forecasts.overall_ratings[seed.value];

    const sliderSeedTime = moment(this.state.forecasts.swells[seed.value].date_time);

    let dateCopy = date.toDate();
    let startDate = moment(date).startOf('day');
    let endDate = moment(date).endOf('day');
    const sliderData = this.state.forecasts.overall_ratings.filter(item => moment(item.date_time).isBetween(startDate, endDate));

    // TODO: refactor all these into individual components/containers

    return (
      <div>
        <SpotHeader
          name={this.state.spot.name}
          region={this.state.spot.region}
          match={this.props.match}
        />
        <Row withColumn>
          <Route path={`${routeMatchUrl}/forecast`} exact render={() => (
            <div className="spot-page__forecast">
              <SpotForecastContainer
                forecasts={this.state.forecasts}
              />
              <SessionCard
                isExpanded
                rating={this.state.forecasts.overall_ratings[seed.value]}
                swell={this.state.forecasts.swells[seed.value]}
                wind={this.state.forecasts.winds[seed.value]}
                tide_current={this.state.forecasts.tides[seed.value]}
              />
              <SpotShareContainer
                selectedMoment={date}
                spotName={this.state.spot.name}
              />
            </div>
          )} />

          <Route path={routeMatchUrl} exact render={() => (
            <SpotDayContainer
              selectedTime={seed.value}
              forecasts={this.state.forecasts}
            />
          )} />

          <Route path={`${routeMatchUrl}/about`} exact render={() => (
            <SpotAboutContainer
              data={this.state.spot}
            />
          )} />

          <Route path={`${routeMatchUrl}/history`} exact render={() => (
            <div id="history-section" className="grid-x">
              <div className="large-12 cell">
                <h3>HISTORY COMING SOON</h3>
              </div>
            </div>
          )} />

          <SpotTimeSlider
            curveData={sliderData}
            updateParent={this.updateSelectedDateTime}
            seedTime={sliderSeedTime}
          />
        </Row>
      </div>
    );
  }
}

SpotPage.propTypes = {
  match: PropTypes.object,
}

export default SpotPage;
