import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Route } from 'react-router-dom';

import MathUtil from 'lib/MathUtil';
import SpotUtil from 'lib/SpotUtil';
import Api from 'lib/ApiUtil';

import SpotAboutContainer from 'containers/SpotAboutContainer';
import SpotForecastContainer from 'containers/SpotForecastContainer';
import SpotDayContainer from 'containers/SpotDayContainer';

import SpotBanner from 'components/SpotBanner';
import NavigationTabs from 'components/NavigationTabs';
import SpotInfoCard from 'components/SpotInfoCard';
import SpotTimeSlider from 'components/SpotTimeSlider';

class SpotPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      navItems: [],
      spotId: null,
      selectedDateTime: moment()
    };

    this.findForecastSeedFromTime = this.findForecastSeedFromTime.bind(this);
    this.updateSelectedDateTime = this.updateSelectedDateTime.bind(this);
    this.setNavItems = this.setNavItems.bind(this);
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
    this.setNavItems();
  }

  setNavItems() {
    console.log(this.props.match);
    this.setState({
      navItems: [
        {
          name: 'Today',
          link: `${this.props.match.url}`
        },
        {
          name: 'Forecast',
          link: `${this.props.match.url}/forecast`
        },
        {
          name: 'About',
          link: `${this.props.match.url}/about`
        },
        {
          name: 'History',
          link: `${this.props.match.url}/history`
        },
      ]
    });
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
        <div>
          <NavigationTabs
            isBusy
            items={this.state.navItems}
          />
          <SpotBanner isBusy />
          <SpotDayContainer />
        </div>
      );
    }

    const date = this.state.selectedDateTime;
    const seed = this.findForecastSeedFromTime(this.state.forecasts.swells, date);

    console.log('selectedDateTime: ', date);

    const current_overall_rating = this.state.forecasts.overall_ratings[seed.value];

    const sliderSeedTime = moment(this.state.forecasts.swells[seed.value].date_time);

    let dateCopy = date.toDate();
    let startDate = moment(date).set('hours', 3);
    let endDate = moment(date).set('hours', 23);
    const sliderData = this.state.forecasts.overall_ratings.filter(item => moment(item.date_time).isBetween(startDate, endDate));

    // TODO: refactor all these into individual components/containers

    return (
      <div>
        <NavigationTabs
          items={this.state.navItems}
        />
        <SpotBanner
          current_potential={MathUtil.round(current_overall_rating.rating, 0)}
          name={this.state.spot.name}
          region={this.state.spot.region}
        />

        <Route path={this.props.match.url} exact render={() => (
          <SpotDayContainer
            selectedTime={seed.value}
            forecasts={this.state.forecasts}
          />
        )} />

        <Route path={`${this.props.match.url}/forecast`} exact render={() => (
          <SpotForecastContainer
            forecasts={this.state.forecasts}
          />
        )} />

        <Route path={`${this.props.match.url}/about`} exact render={() => (
          <SpotAboutContainer
            data={this.state.spot}
          />
        )} />

        <Route path={`${this.props.match.url}/history`} exact render={() => (
          <div id="history-section" className="row">
            <div className="large-12 columns">
              <h3>HISTORY COMING SOON</h3>
            </div>
          </div>
        )} />

        <SpotTimeSlider
          curveData={sliderData}
          updateParent={this.updateSelectedDateTime}
          seedTime={sliderSeedTime}
        />
      </div>
    );
  }
}

SpotPage.propTypes = {
  match: PropTypes.object,
}

export default SpotPage;
