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
          <button className="btn">Advanced</button>
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

  render() {
    if (!this.props.forecasts) {
      // PUT LOADING STATE HERE
      return null;
    }

    const forecasts = this.props.forecasts;
    const overallRatings = this.getYVals(forecasts.overall_ratings, ['rating']);
    const swellRatings = this.getYVals(forecasts.swells, ['size_rating', 'direction_rating', 'rating', 'size', 'direction']);
    const windRatings = this.getYVals(forecasts.winds, ['speed_rating', 'direction_rating', 'rating', 'speed', 'direction']);
    const tideRatings = this.getYVals(forecasts.tides, ['rating', 'height']);
    // console.log(overallRatings);
    // console.log(swellRatings);
    // console.log(windRatings);
    // console.log(tideRatings);

    return (
      <div id="forecast-section">
        <Row>
          <Column widthSmall={12} widthMedium={12} widthLarge={12}>
            <AreaGraph
              heightRatio={0.2}
              cssSelector='forecast-graph'
              targetId='forecast-graph-combined'
              graphs={[
                {
                  label: 'Overall rating',
                  yVals: overallRatings['rating'],
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
                  yVals: swellRatings['size'],
                  yMax: Math.max.apply(Math, swellRatings['size']) + 2,
                  directions: swellRatings['direction'],
                  line: {
                    show: true,
                  },
                  area: {
                    show: false,
                  },
                  points: {
                    show: true,
                  },
                  color: '#C377E0'
                },
                {
                  label: 'Wind speed',
                  yVals: windRatings['speed'],
                  yMax: Math.max.apply(Math, windRatings['speed']) + 10,
                  directions: windRatings['direction'],
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
              forecastDays={5}
            />
          </Column>
        </Row>
        <Row>
          <Column widthSmall={12} widthMedium={12} widthLarge={12}>
            <AreaGraph
              heightRatio={0.06}
              cssSelector='forecast-graph'
              targetId='forecast-graph-tide'
              graphs={[
                {
                  label: 'Tide rating',
                  yVals: tideRatings['rating'],
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
                  label: 'Tide height',
                  yVals: tideRatings['height'],
                  yMax: Math.max.apply(Math, tideRatings['height']) + 0.5,
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
              forecastDays={5}
            />
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
