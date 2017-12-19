import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import MathUtil from 'lib/MathUtil';
import SpotUtil from 'lib/SpotUtil';
import Units from 'lib/Units';

import SpotForecastTideAndWeather from 'containers/SpotForecastTideAndWeather';

import Row from 'components/Row';
import Column from 'components/Column';
import AreaGraph from 'components/AreaGraph';
import Spinner from 'components/Spinner';
import Icon from 'components/Icon';

const Colors = {
  Rating: '#9ACD32',
  WindSpeed: '#6F7C82',
  SwellSize: '#6F7C82',
  TideHeight: '#DBDBDB',
};

class SpotForecastContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewing: "combined",
    }

    this.getYVals = this.getYVals.bind(this);
    this.handleViewingChange = this.handleViewingChange.bind(this);
    this.updateParent = this.updateParent.bind(this);
  }

  getYVals(dataset, keys) {
    let result = {};
    keys.forEach(k => {
      result[k] = [];
    });
    dataset.forEach(d => {
      keys.forEach(k => {
        result[k].push(d[k]);
      });
    });
    return result;
  }

  handleViewingChange(event) {
    this.setState({
      viewing: event.target.value,
    });
  }

  overallRatings() {
    return this.getYVals(this.props.forecasts.overall_ratings, ['rating']);
  }

  swellData() {
    const data = JSON.parse(JSON.stringify(this.props.forecasts.swells)); // Need to clone this, otherwise the reference gets updated too :(
    data.forEach((row, i) => {
      data[i].size = SpotUtil.metresToFeet(row.size);
    });
    return this.getYVals(data, ['size_rating', 'direction_rating', 'rating', 'size', 'direction']);
  }

  windData() {
    const data = JSON.parse(JSON.stringify(this.props.forecasts.winds)); // Need to clone this, otherwise the reference gets updated too :(
    data.forEach((row, i) => {
      data[i].speed = SpotUtil.kphToKnots(row.speed);
    });
    return this.getYVals(data, ['speed_rating', 'direction_rating', 'rating', 'speed', 'direction']);
  }

  tideData() {
    return this.getYVals(this.props.forecasts.tides, ['rating', 'height']);
  }

  getMaxSwellHeight() {
    const maxInDataset = Math.max.apply(Math, this.swellData()['size']) + 2;
    const baseline = 9; // ft
    return Math.max.apply(Math, [maxInDataset, baseline]);
  }

  getMaxWindSpeed() {
    const maxInDataset = Math.max.apply(Math, this.windData()['speed']) + 10;
    const baseline = 35; // knots
    return Math.max.apply(Math, [maxInDataset, baseline]);;
  }

  updateParent(n) {
    const datetime = moment(this.props.forecasts.swells[n].date_time);
    this.props.updateParent(datetime);
  }

  render() {
    if (!this.props.forecasts) {
      return <Spinner />;
    }
    const selectedDateTimePosition = this.props.selectedDateTimePosition;
    const forecastConfig = this.props.forecastConfig;
    console.log('SPOTFORECAST WITH', this.props.forecastConfig);

    const combinedGraphs = [
      {
        label: 'Overall rating',
        name: 'rating',
        yVals: this.overallRatings()['rating'],
        yMax: 110,
        line: {
          show: forecastConfig.showOverallRating,
          opacity: 1,
          dashed: true,
          stroke: 2,
        },
        area: {
          show: false,
        },
        points: {
          show: false,
        },
        color: Colors.Rating,
      },
      {
        label: 'Swell size',
        name: 'swell-size',
        yVals: this.swellData()['size'],
        yMax: this.getMaxSwellHeight(),
        // directions: this.swellData()['direction'],
        axesSuffix: 'ft',
        line: {
          show: true,
          stroke: 3,
        },
        area: {
          show: false,
        },
        points: {
          show: false,
        },
        color: Colors.SwellSize,
      },
      {
        label: 'Wind speed',
        name: 'wind-speed',
        yVals: this.windData()['speed'],
        yMax: this.getMaxWindSpeed(),
        directions: this.windData()['direction'],
        axesSuffix: 'kt',
        line: {
          show: true,
          stroke: 0.75,
        },
        area: {
          show: false,
        },
        points: {
          show: true,
        },
        color: Colors.WindSpeed
      }
    ];

    const tideGraphs = [
      {
        label: 'Tide height',
        name: 'tide-height',
        yVals: this.tideData()['height'],
        yMax: Math.max.apply(Math, this.tideData()['height']) + 0.5,
        line: {
          show: false,
        },
        area: {
          show: true,
          flat: true,
        },
        points: {
          show: false,
        },
        color: Colors.TideHeight,
      }
    ];

    const combinedGraphConfig = {
      ...forecastConfig,
      showNightAndDay: false,
    };

    return (
      <div className="forecast-graph-cards">
        <div className="forecast-graph-card">
          <div className="forecast-graphs-parent">
            <h5>SWELL &amp; WIND</h5>
            <AreaGraph
              forecastConfig={combinedGraphConfig}
              cssSelector='forecast-graph'
              targetId='forecast-graph-combined'
              graphs={combinedGraphs}
              legend={false}
              updateParent={this.updateParent}
              selectedDateTimePosition={selectedDateTimePosition}
            />
          </div>
        </div>
        <div className="forecast-graph-card">
          <div className="forecast-graphs-parent">
            <h5>Tide, Weather &amp; Sun <Icon name="chevron-down" /></h5>

            <AreaGraph
              forecastConfig={forecastConfig}
              cssSelector='forecast-graph'
              targetId='forecast-graph-tide'
              graphs={tideGraphs}
              legend={false}
              showAxes={false}
              updateParent={this.updateParent}
              selectedDateTimePosition={selectedDateTimePosition}
            />

            <SpotForecastTideAndWeather spot={this.props.spot} />
          </div>
        </div>
      </div>
    );
  }
}

SpotForecastContainer.defaultProps = {
  forecasts: null,
  updateParent: null,
  selectedDateTimePosition: null,
  forecastConfig: null,
};

SpotForecastContainer.PropTypes = {
  forecasts: PropTypes.object,
  updateParent: PropTypes.func,
  selectedDateTimePosition: PropTypes.number,
  forecastConfig: PropTypes.object.isRequired,
  spot: PropTypes.object,
};

export default SpotForecastContainer;
