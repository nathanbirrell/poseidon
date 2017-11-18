import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import MathUtil from 'lib/MathUtil';
import SpotUtil from 'lib/SpotUtil';

import Row from 'components/Row';
import Column from 'components/Column';
import AreaGraph from 'components/AreaGraph';

class SpotForecastContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewing: "combined",
    }

    this.getYVals = this.getYVals.bind(this);
    this.handleViewingChange = this.handleViewingChange.bind(this);
    this.renderAdvanced = this.renderAdvanced.bind(this);
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
    return this.getYVals(this.props.forecasts.swells, ['size_rating', 'direction_rating', 'rating', 'size', 'direction']);
  }

  windData() {
    return this.getYVals(this.props.forecasts.winds, ['speed_rating', 'direction_rating', 'rating', 'speed', 'direction']);
  }

  tideData() {
    return this.getYVals(this.props.forecasts.tides, ['rating', 'height']);
  }

  getMaxSwellHeight() {
    const maxInDataset = Math.max.apply(Math, this.swellData()['size']) + 2;
    const baseline = 7; // 7 ft min
    return Math.max.apply(Math, [maxInDataset, baseline]);
  }

  getMaxWindSpeed() {
    const maxInDataset = Math.max.apply(Math, this.windData()['speed']) + 10;
    const baseline = 30; // 30 knot baseline
    return Math.max.apply(Math, [maxInDataset, baseline]);;
  }

  render() {
    if (!this.props.forecasts) {
      // PUT LOADING STATE HERE
      return null;
    }

    return (
      <div id="forecast-section">
        <Row>
          <Column widthSmall={12} widthMedium={12} widthLarge={12}>
            <div className="forecast-graphs-parent">
              <h5> Swell &amp; Wind</h5>
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
                    color: '#27AE60'
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
                      show: false,
                    },
                    color: '#C377E0'
                  },
                  {
                    label: 'Wind speed',
                    yVals: this.windData()['speed'],
                    yMax: this.getMaxWindSpeed(),
                    directions: this.windData()['direction'],
                    axesSuffix: 'kph',
                    line: {
                      show: true,
                    },
                    area: {
                      show: false,
                    },
                    points: {
                      show: true,
                    },
                    color: '#0079BF'
                  }
                ]}
                legend={false}
              />
              <h5>Tides</h5>
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
                    color: '#CDCDCD'
                  }
                ]}
                legend={false}
                showAxes={false}
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
};

SpotForecastContainer.PropTypes = {
  forecasts: PropTypes.object,
};

export default SpotForecastContainer;
