import React from 'react';
import PropTypes from 'prop-types';
import String from 'string';
import moment from 'moment';

import Api from 'lib/ApiUtil';
import MathUtil from 'lib/MathUtil';
import SpotUtil from 'lib/SpotUtil';
import TideUtil from 'lib/TideUtil';
import Units from 'lib/Units';
import {mapCodeToIcon} from 'lib/WeatherPrecisUtil';

import Row from 'components/Row';
import Icon from 'components/Icon';
import Column from 'components/Column';
import AreaGraph from 'components/AreaGraph';
import Spinner from 'components/Spinner';

const Colors = {
  Rating: '#9ACD32',
  WindSpeed: '#6F7C82',
  SwellSize: '#6F7C82',
  TideHeight: '#DBDBDB',
};

class SpotForecastTideAndWeather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tidesDaily: null,
      weatherDaily: null,
    }

    this.isDark = this.isDark.bind(this);
    this.renderTide = this.renderTide.bind(this);
  }

  componentDidMount() {
    this.fetchTides();
    this.fetchWeather();
  }

  fetchTides() {
    let tides = Api.syncData(`/spots/${this.props.spot.id}/forecast/tides.json`);

    tides.then(tidesResponse => {
      const tidesInDays = TideUtil.splitTidesIntoDays(JSON.parse(tidesResponse));
      try {
        this.setState({
          tidesDaily: tidesInDays,
        });
      } catch (error) {
        console.error(error);
      }
    });
  }

  fetchWeather() {
    let weather = Api.syncData(`/spots/${this.props.spot.id}/forecast/weather-daily.json`);

    weather.then(weatherResponse => {
      try {
        this.setState({
          weatherDaily: JSON.parse(weatherResponse),
        });
      } catch (error) {
        console.error(error);
      }
    });
  }

  isDark(time) {
    // TODO: make this dynamic based on sunrise/sunset times!!
    // Don't render if before 6:00 or after 20:30 (it's summer :))
    const light = moment(time).startOf('day').hours(4).format();
    const dark = moment(time).startOf('day').hours(20).minutes(30).format();
    const beforeLight = moment(time).isBefore(light);
    const afterDark = moment(time).isAfter(dark);
    return beforeLight || afterDark;
  }

  renderTide(tide) {
    if (this.isDark(tide.date_time)) { return null; }

    const type = String(tide.tide_type).titleCase().s
    const time = moment(tide.date_time).format('h:mma');
    return (
      <span key={time}>
        <strong>{type}</strong>: {time} ({tide.height}m) <br />
      </span>
    );
  }

  render() {
    if (!this.state.tidesDaily || !this.state.weatherDaily) { return <Spinner isSmall />; }

    return (
      <div>
        <div className="tide-sun-values">
          {this.state.tidesDaily.map((day) => (
            <div className="day-block --tide" key={day.date}>
              {day.tides.map(this.renderTide)}
            </div>
          ))}
        </div>
        <div className="tide-sun-values">
          {this.state.weatherDaily.map((day) => (
            <div className="day-block --weather" key={day.date}>
              <Icon name={mapCodeToIcon(day.precis_code)} size={Icon.Size.LARGE} /> <br />
              <strong className="temp-max">{day.temp_max}&#8451;</strong> <span className="temp-min">/ {day.temp_min}&#8451; </span><br/>
              {day.precis}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

SpotForecastTideAndWeather.defaultProps = {
};

SpotForecastTideAndWeather.PropTypes = {
  spot: PropTypes.object.isRequired,
};

export default SpotForecastTideAndWeather;
