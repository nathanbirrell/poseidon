import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import MathUtil from 'lib/MathUtil';
import SpotUtil from 'lib/SpotUtil';

import AreaGraph from 'components/AreaGraph';

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
    const swellRatings = this.getYVals(forecasts.swells, ['size_rating', 'direction_rating', 'rating', 'size', 'direction']);
    const windRatings = this.getYVals(forecasts.winds, ['speed_rating', 'direction_rating', 'rating', 'speed', 'direction']);
    const tideRatings = this.getYVals(forecasts.tides, ['rating', 'height']);
    console.log(overallRatings);
    console.log(swellRatings);
    console.log(windRatings);
    console.log(tideRatings);

    return (
      <div id="forecast-section" className="row">
        <div className="small-12 medium-12 large-12 columns">
          <div id="forecast-graph-overall" className="forecast-graph-container"/>
          <h3>Overall Rating</h3>
          <AreaGraph
            heightRatio={0.25}
            cssSelector='forecast-graph'
            targetId='forecast-graph-overall'
            graphs={[
              {
                yVals: overallRatings['rating'],
                yMax: 110,
                line: {
                  show: true,
                },
                area: {
                  show: true,
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
                yVals: swellRatings['size'],
                yMax: Math.max.apply(Math, swellRatings['size']) + 3,
                line: {
                  show: true,
                },
                area: {
                  show: false,
                },
                points: {
                  show: true,
                  radius: 1,
                },
                color: '#F2994A'
              }
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
                yVals: windRatings['speed'],
                yMax: Math.max.apply(Math, windRatings['speed']) + 10,
                line: {
                  show: true,
                },
                area: {
                  show: false,
                },
                points: {
                  show: true,
                  radius: 1,
                },
                color: '#F2994A'
              }
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
                  radius: 1,
                },
                color: '#F2994A'
              }
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
