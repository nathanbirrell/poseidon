import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import MathUtil from 'lib/MathUtil';
import SpotUtil from 'lib/SpotUtil';
import Api from 'lib/ApiUtil';
import UrlUtil from 'lib/UrlUtil';

import SpotBanner from './spot-banner';
import NavigationTabs from './navigation-tabs';
import AreaGraph from './area-graph';
import SpotDayContainer from './spot-day-container';
import SpotForecastContainer from './spot-forecast-container';
import SpotAboutContainer from './spot-about-container';
import SpotTimeSlider from './spot-time-slider';

class SpotContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      navItems: [],
      spotId: null,
      selectedDateTime: this.initTime()
    };

    this.syncData = this.syncData.bind(this);
    this.updateSelectedNavItem = this.updateSelectedNavItem.bind(this);
    this.findForecastSeedFromTime = this.findForecastSeedFromTime.bind(this);
    this.updateSelectedDateTime = this.updateSelectedDateTime.bind(this);
  }

  componentDidMount() {
    let spot = this.syncData(window.location.href + '.json');
    let forecasts = this.syncData(window.location.href + '/forecasts.json');

    Promise.all([spot, forecasts]).then(values => {
      const spotJson = JSON.parse(values[0]);
      const forecastsJson = JSON.parse(values[1]);
      this.setState({
        spot: spotJson,
        forecasts: forecastsJson,
      });
    });
  }

  initTime() {
    const query = decodeURIComponent(UrlUtil.searchParams.get('date_time'));
    if (query !== null) {
      const output = moment(query);
      console.log('query', query, output);
      if (output._isValid) {
        console.log('URL Query is valid', output);
        return output;
      }
    }
    return moment();
  }

  setNavItems() {
    console.log(this.props.match);
    this.setState({
      selectedNavItem: number,
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
    console.log('render');
    if (!this.state.spot || !this.state.forecasts) {
      return (
        <div>
          <SpotBanner isBusy />
          <NavigationTabs
            isBusy
            items={this.state.navItems}
            onChange={this.updateSelectedNavItem}
          />
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

    return(
      <div>
        <SpotBanner
          current_potential={MathUtil.round(current_overall_rating.rating, 0)}
          name={this.state.spot.name}
          region={this.state.spot.region}
        />
        <NavigationTabs
          items={this.state.navItems}
          onChange={this.updateSelectedNavItem}
        />
        {this.state.selectedNavItem === this.state.navItems.indexOf('Today') ?
          <SpotDayContainer
            selectedTime={seed.value}
            selectedMoment={date}
            forecasts={this.state.forecasts}
          />
        : null}
        {this.state.selectedNavItem === this.state.navItems.indexOf('Forecast') ?
          <SpotForecastContainer
            forecasts={this.state.forecasts}
          />
        : null}
        {this.state.selectedNavItem === this.state.navItems.indexOf('About') ?
          <SpotAboutContainer
           data={this.state.spot}
          />
        : null}
        {this.state.selectedNavItem === this.state.navItems.indexOf('History') ?
        <div id="history-section" className="row">
          <div className="large-12 columns">
            <h3>HISTORY COMING SOON</h3>
          </div>
        </div>
        : null}
        <SpotTimeSlider
          curveData={sliderData}
          updateParent={this.updateSelectedDateTime}
          seedTime={sliderSeedTime}
        />
      </div>
    );
  }
}

export default SpotContainer;
