import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import MathUtil from 'lib/MathUtil';
import SpotUtil from 'lib/SpotUtil';
import Units from 'lib/Units';

import Row from 'components/Row';
import Column from 'components/Column';
import AreaGraph from 'components/AreaGraph';
import Spinner from 'components/Spinner';

const Colors = {
  Rating: '#27AE60',
  WindSpeed: '#C377E0',
  SwellSize: '#0079BF',
  TideHeight: '#CDCDCD',
};

class SpotForecastContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewing: "combined",
    }

    this.getYVals = this.getYVals.bind(this);
    this.handleViewingChange = this.handleViewingChange.bind(this);
    this.renderAdvanced = this.renderAdvanced.bind(this);
    this.updateParent = this.updateParent.bind(this);
  }

  renderAdvanced() {
    return (
      <Row>
        <Column widthSmall={6} widthMedium={6} widthLarge={4}>
          <button className="btn-incognito --icon --icon-chevron-down--dark-secondary">Advanced</button>
        </Column>
      </Row>
    );
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
    const data = this.props.forecasts.swells[n];
    const datetime = moment(data.date_time);
    this.props.updateParent(datetime, n);
  }

  render() {
    if (!this.props.forecasts) {
      return <Spinner />;
    }

    const bespokeSpacing = {
      paddingTop: '35px',
    };
    const selectedDateTimePosition = this.props.selectedDateTimePosition;

    return (
      <div id="forecast-section">
        <Row>
          <Column widthSmall={12} widthMedium={12} widthLarge={12}>
            <div className="forecast-graphs-parent">
              <h5>SWELL &amp; WIND</h5>
              <AreaGraph
                heightRatio={0.2}
                cssSelector='forecast-graph'
                targetId='forecast-graph-combined'
                graphs={[
                  {
                    label: 'Overall rating',
                    yVals: this.overallRatings()['rating'],
                    yMax: 110,
                    line: {
                      show: false,
                    },
                    area: {
                      show: true,
                      opacity: 0.5,
                    },
                    points: {
                      show: false,
                    },
                    color: Colors.Rating,
                  },
                  {
                    label: 'Swell size',
                    yVals: this.swellData()['size'],
                    yMax: this.getMaxSwellHeight(),
                    // directions: this.swellData()['direction'],
                    axesSuffix: 'ft',
                    line: {
                      show: true,
                    },
                    area: {
                      show: false,
                    },
                    points: {
                      show: true,
                    },
                    color: Colors.SwellSize,
                  },
                  {
                    label: 'Wind speed',
                    yVals: this.windData()['speed'],
                    yMax: this.getMaxWindSpeed(),
                    directions: this.windData()['direction'],
                    axesSuffix: 'kt',
                    line: {
                      show: true,
                    },
                    area: {
                      show: false,
                    },
                    points: {
                      show: true,
                    },
                    color: Colors.WindSpeed
                  }
                ]}
                legend={false}
                updateParent={this.updateParent}
                selectedDateTimePosition={selectedDateTimePosition}
              />
              <h5 style={bespokeSpacing}>TIDE &amp; SUN</h5>
              <AreaGraph
                heightRatio={0.06}
                cssSelector='forecast-graph'
                targetId='forecast-graph-tide'
                graphs={[
                  {
                    label: 'Tide height',
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
                ]}
                legend={false}
                showAxes={false}
                updateParent={this.updateParent}
                selectedDateTimePosition={selectedDateTimePosition}
              />
            </div>
          </Column>
        </Row>
        {this.renderAdvanced()}
      </div>
    );
  }
}

SpotForecastContainer.defaultProps = {
  forecasts: null,
  updateParent: null,
  selectedDateTime: null,
  selectedDateTimePosition: null,
};

SpotForecastContainer.PropTypes = {
  forecasts: PropTypes.object,
  updateParent: PropTypes.func,
  selectedDateTime: PropTypes.object,
  selectedDateTimePosition: PropTypes.number,
};

export default SpotForecastContainer;
