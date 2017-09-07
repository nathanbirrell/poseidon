import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import MathUtil from 'math-util.js';
import SpotUtil from 'spot-util.js';

import AreaGraph from './area-graph';

class SpotForecastContainer extends React.Component {
  constructor(props) {
    super(props);

    this.getYVals = this.getYVals.bind(this);
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

  render() {
    if (!this.props.forecasts) {
      // PUT LOADING STATE HERE
      return null;
    }

    const forecasts = this.props.forecasts;
    const overallRatings = this.getYVals(forecasts.overall_ratings, ['rating']);
    const swellRatings = this.getYVals(forecasts.swells, ['size_rating', 'direction_rating', 'rating']);
    const windRatings = this.getYVals(forecasts.winds, ['speed_rating', 'direction_rating', 'rating']);
    const tideRatings = this.getYVals(forecasts.tides, ['rating']);
    console.log(overallRatings);
    console.log(swellRatings);
    console.log(windRatings);
    console.log(tideRatings);

    return (
      <div id="forecast-section" className="row">
        <div className="small-12 medium-12 large-12 columns">
          <div id="forecast-graph-4" className="forecast-graph-container"/>
          <h3>Overall Rating</h3>
          <AreaGraph
            heightRatio={0.25}
            cssSelector='forecast-graph'
            targetId='forecast-graph-4'
            graphs={[
              {
                yVals: overallRatings['rating'],
                line: {
                  show: true,
                  opacity: 0.5,
                },
                area: {
                  show: true,
                  opacity: 0.25,
                },
                points: {
                  show: true,
                  radius: 1,
                },
                color: '#27AE60'
              },
            ]}
          />
        </div>
        <div className="small-12 medium-6 large-4 columns">
          <div id="forecast-graph-1" className="forecast-graph-container"/>
          <h3>Swell</h3>
          <AreaGraph
            heightRatio={0.25}
            pointRadius={1}
            cssSelector='forecast-graph'
            targetId='forecast-graph-1'
            graphs={[
              {
                yVals: swellRatings['rating'],
                line: {
                  show: true,
                  opacity: 0.5,
                },
                area: {
                  show: true,
                  opacity: 0.25,
                },
                points: {
                  show: true,
                  radius: 1,
                },
                color: '#27AE60'
              },
              {
                yVals: swellRatings['size_rating'],
                line: {
                  show: true,
                  opacity: 0.5,
                },
                area: {
                  show: true,
                  opacity: 0.05,
                },
                points: {
                  show: true,
                  radius: 1,
                },
                color: '#F2994A'
              },
              {
                yVals: swellRatings['direction_rating'],
                line: {
                  show: true,
                  opacity: 0.5,
                },
                area: {
                  show: true,
                  opacity: 0.05,
                },
                points: {
                  show: true,
                  radius: 1,
                },
                color: '#EB5757'
              },
            ]}
          />
        </div>
        <div className="small-12 medium-6 large-4 columns">
          <div id="forecast-graph-2" className="forecast-graph-container"/>
          <h3>Wind</h3>
          <AreaGraph
            heightRatio={0.25}
            pointRadius={1}
            cssSelector='forecast-graph'
            targetId='forecast-graph-2'
            graphs={[
              {
                yVals: windRatings['rating'],
                line: {
                  show: true,
                  opacity: 0.5,
                },
                area: {
                  show: true,
                  opacity: 0.25,
                },
                points: {
                  show: true,
                  radius: 1,
                },
                color: '#27AE60'
              },
              {
                yVals: windRatings['speed_rating'],
                line: {
                  show: true,
                  opacity: 0.5,
                },
                area: {
                  show: true,
                  opacity: 0.05,
                },
                points: {
                  show: true,
                  radius: 1,
                },
                color: '#F2994A'
              },
              {
                yVals: windRatings['direction_rating'],
                line: {
                  show: true,
                  opacity: 0.5,
                },
                area: {
                  show: true,
                  opacity: 0.05,
                },
                points: {
                  show: true,
                  radius: 1,
                },
                color: '#EB5757'
              },
            ]}
          />
        </div>
        <div className="small-12 medium-6 large-4 columns">
          <div id="forecast-graph-3" className="forecast-graph-container"/>
          <h3>Tide</h3>
          <AreaGraph
            heightRatio={0.25}
            cssSelector='forecast-graph'
            targetId='forecast-graph-3'
            graphs={[
              {
                yVals: tideRatings['rating'],
                line: {
                  show: true,
                  opacity: 0.5,
                },
                area: {
                  show: true,
                  opacity: 0.25,
                },
                points: {
                  show: true,
                  radius: 1,
                },
                color: '#27AE60'
              },
            ]}
          />
        </div>
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
