import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import SpotUtil from 'lib/SpotUtil';
import MathUtil from 'lib/MathUtil';

import SpotForecastTideAndWeather from 'modules/forecast/containers/WeatherForecast';
import SpotCustomiseForecastContainer from 'modules/forecast/containers/CustomiseForecast';

import ScrollSync from 'core/components/ScrollSync';
import ScrollSyncPane from 'core/components/ScrollSyncPane';
import Spinner from 'core/components/Spinner';
import LegendKey from 'core/components/LegendKey';
import AreaGraph from 'core/components/AreaGraph';
import ExpandCollapseCard from 'core/components/ExpandCollapseCard';

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
      viewing: 'combined',
      forecastConfig: {
        showOverallRating: true,
        showNightAndDay: true,
        showSwellAndWind: true,
      },
    };

    this.getYVals = this.getYVals.bind(this);
    this.handleViewingChange = this.handleViewingChange.bind(this);
    this.updateParent = this.updateParent.bind(this);
    this.updateForecastConfig = this.updateForecastConfig.bind(this);
  }

  getYVals(dataset, keys) {
    const result = {};
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

  getMaxSwellHeight() {
    const maxInDataset = Math.max(...this.swellData().size) + 2;
    const baseline = 9; // ft
    return Math.max.apply(Math, [maxInDataset, baseline]);
  }

  getMaxWindSpeed() {
    const maxInDataset = Math.max(...this.windData().speed) + 10;
    const baseline = 35; // knots
    return Math.max.apply(Math, [maxInDataset, baseline]);
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

  overallRatings() {
    return this.getYVals(this.props.forecasts.overall_ratings, ['rating']);
  }

  handleViewingChange(event) {
    this.setState({
      viewing: event.target.value,
    });
  }

  updateParent(n) {
    const datetime = moment(this.props.forecasts.swells[n].date_time);
    this.props.updateParent(datetime);
  }

  updateForecastConfig(forecastConfig) {
    this.setState({
      forecastConfig,
    });
  }

  render() {
    if (!this.props.forecasts) {
      return <Spinner />;
    }
    const { selectedDateTimePosition } = this.props;
    const { forecastConfig } = this.state;

    const combinedGraphs = [
      {
        label: 'Overall rating',
        name: 'rating',
        yVals: this.overallRatings().rating,
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
        yVals: this.swellData().size,
        yMax: this.getMaxSwellHeight(),
        // directions: this.swellData().direction,
        axesSuffix: 'ft',
        line: {
          show: forecastConfig.showSwellAndWind,
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
        yVals: this.windData().speed,
        yMax: this.getMaxWindSpeed(),
        directions: forecastConfig.showSwellAndWind ? this.windData().direction : null,
        axesSuffix: 'kt',
        line: {
          show: forecastConfig.showSwellAndWind,
          stroke: 0.75,
        },
        area: {
          show: false,
        },
        points: {
          show: forecastConfig.showSwellAndWind,
        },
        color: Colors.WindSpeed,
      },
    ];

    const tideGraphs = [
      {
        label: 'Tide height',
        name: 'tide-height',
        yVals: this.tideData().height,
        yMax: Math.max(...this.tideData().height) + 0.5,
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
      },
    ];

    const combinedGraphConfig = {
      ...forecastConfig,
      showNightAndDay: false,
    };

    return (
      <ScrollSync>
        <div className="forecast-graph-cards">
          <ExpandCollapseCard
            title="Surf"
            rightHandSide={
              <small className="forecast-graph-legend">
                <SpotCustomiseForecastContainer
                  forecastConfig={this.state.forecastConfig}
                  updateParent={this.updateForecastConfig}
                >
                  {/* // TODO: check config to confirm each is visible on graph before render*/}
                  <LegendKey backgroundColor={Colors.Rating} /> Potential &nbsp;
                  <LegendKey backgroundColor={Colors.SwellSize} /> Swell &nbsp;
                  <LegendKey backgroundColor={Colors.WindSpeed} isThin /> Wind &nbsp;
                </SpotCustomiseForecastContainer>
              </small>
            }
            isCollapseable={false}
          >
            <ScrollSyncPane>
              <div className="forecast-graphs-parent">
                <AreaGraph
                  forecastConfig={combinedGraphConfig}
                  cssSelector="forecast-graph"
                  targetId="forecast-graph-combined"
                  graphs={combinedGraphs}
                  legend={false}
                  updateParent={this.updateParent}
                  selectedDateTimePosition={selectedDateTimePosition}
                />
              </div>
            </ScrollSyncPane>
          </ExpandCollapseCard>

          <ExpandCollapseCard title="Tide, Weather &amp; Sun">
            <ScrollSyncPane>
              <div className="forecast-graphs-parent">
                <AreaGraph
                  forecastConfig={forecastConfig}
                  cssSelector="forecast-graph"
                  targetId="forecast-graph-tide"
                  graphs={tideGraphs}
                  legend={false}
                  showAxes={false}
                  updateParent={this.updateParent}
                  selectedDateTimePosition={selectedDateTimePosition}
                />

                <SpotForecastTideAndWeather spot={this.props.spot} />
              </div>
            </ScrollSyncPane>
          </ExpandCollapseCard>
        </div>
      </ScrollSync>
    );
  }
}

SpotForecastContainer.defaultProps = {
  forecasts: null,
  updateParent: null,
  selectedDateTimePosition: null,
  forecastConfig: null,
  spot: null,
  rating: null,
  swell: null,
  wind: null,
  tide_current: null,
};

SpotForecastContainer.propTypes = {
  forecasts: PropTypes.object,
  updateParent: PropTypes.func,
  selectedDateTimePosition: PropTypes.number,
  forecastConfig: PropTypes.object,
  spot: PropTypes.object,
  rating: PropTypes.object,
  swell: PropTypes.object,
  wind: PropTypes.object,
  tide_current: PropTypes.object,
};

export default SpotForecastContainer;
