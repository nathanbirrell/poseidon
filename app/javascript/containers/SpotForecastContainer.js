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
    this.renderChooseForecast = this.renderChooseForecast.bind(this);
  }

  renderChooseForecast() {
    return (
      <Row>
        <Column widthSmall={6} widthMedium={6} widthLarge={4}>
          <div className="input-holder --icon --icon-bar-chart-2--dark-secondary --clickable">
            <select
              className="filter-select"
              onChange={this.handleViewingChange}
              value={this.state.viewing}
            >
              <option value="combined">Combined</option>
              <option value="swell">Swell</option>
              <option value="wind">Wind</option>
              <option value="tide">Tide</option>
            </select>
          </div>
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
        {this.renderChooseForecast()}

        {this.state.viewing === "combined" ?
          <Row>
            <Column widthSmall={12} widthMedium={12} widthLarge={12}>
              <div id="forecast-graph-combined" className="forecast-graph-container"/>
              <AreaGraph
                heightRatio={0.25}
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
                    color: '#F2994A'
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
                    color: '#EB5757'
                  },
                  {
                    label: 'Tide height',
                    yVals: tideRatings['height'],
                    yMax: Math.max.apply(Math, tideRatings['height']) * 3.5,
                    line: {
                      show: true,
                    },
                    area: {
                      show: false,
                    },
                    points: {
                      show: false,
                    },
                    color: '#2278F1'
                  }
                ]}
                legend={false}
                forecastDays={5}
              />
            </Column>
          </Row>
        : null}
        {this.state.viewing === "swell" ?
          <Row>
            <Column widthSmall={12} widthMedium={12} widthLarge={12}>
              <div id="forecast-graph-1" className="forecast-graph-container"/>
              <AreaGraph
                heightRatio={0.25}
                pointRadius={1}
                cssSelector='forecast-graph'
                targetId='forecast-graph-1'
                graphs={[
                  {
                    label: 'Swell rating',
                    yVals: swellRatings['rating'],
                    yMax: 110,
                    line: {
                      show: false,
                    },
                    area: {
                      show: true,
                    },
                    points: {
                      show: false,
                    },
                    color: '#27AE60'
                  },
                  {
                    label: 'Swell height',
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
                    color: '#F2994A'
                  }
                ]}
                legend={false}
                forecastDays={5}
              />
            </Column>
          </Row>
        : null}
        {this.state.viewing === "wind" ?
          <Row>
            <Column widthSmall={12} widthMedium={12} widthLarge={12}>
              <div id="forecast-graph-2" className="forecast-graph-container"/>
              <AreaGraph
                heightRatio={0.25}
                pointRadius={1}
                cssSelector='forecast-graph'
                targetId='forecast-graph-2'
                graphs={[
                  {
                    label: 'Wind rating',
                    yVals: windRatings['rating'],
                    yMax: 110,
                    line: {
                      show: false,
                    },
                    area: {
                      show: true,
                    },
                    points: {
                      show: false,
                    },
                    color: '#27AE60'
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
                    color: '#F2994A'
                  }
                ]}
                legend={false}
                forecastDays={5}
              />
            </Column>
          </Row>
        : null}
        {this.state.viewing === "tide" ?
          <Row>
            <Column widthSmall={12} widthMedium={12} widthLarge={12}>
              <div id="forecast-graph-3" className="forecast-graph-container"/>
              <AreaGraph
                heightRatio={0.25}
                cssSelector='forecast-graph'
                targetId='forecast-graph-3'
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
                      show: true,
                    },
                    area: {
                      show: false,
                    },
                    points: {
                      show: true,
                    },
                    color: '#F2994A'
                  }
                ]}
                legend={false}
                forecastDays={5}
              />
            </Column>
          </Row>
        : null}
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
