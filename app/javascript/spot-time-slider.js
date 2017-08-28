import React from 'react';
import PropTypes from 'prop-types';

import AreaGraph from './area-graph';

const myData = [100, 50, 15, 30, 60, 100, 70, 60, 40, 80, 60, 100];

class SpotTimeSlider extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: this.props.value,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  showTime(number) {
    let hours = number > 12 ? number - 12 : number;
    let minutes = '30';

    return (
      <span className="time">
        <span>{hours}</span>:<span>{minutes}</span>
      </span>
    );
  }

  render() {
    return (
      <div className="time-slider">
        <div id="time-slider__input" className="time-slider__input">
          <input
            type="range"
            min="6"
            max="18"
            step="1"
            value={this.state.value}
            onChange={this.handleChange}>
          </input>
          <div id="time-slider-graph-container" className="time-slider-graph-container" />
          <AreaGraph
            cssSelector='time-slider-graph'
            targetId='time-slider-graph-container'
            graphs={[
              {
                yVals: [100, 50, 15, 30, 60, 100, 70, 60, 40, 80, 60, 100],
                line: {
                  show: true,
                  opacity: 0.5,
                },
                area: {
                  show: true,
                  opacity: 0.25,
                }
              },
              {
                yVals: [30, 60, 20, 30, 80, 70, 65, 60, 10, 40, 50, 20],
                line: {
                  show: true,
                  opacity: 0.5,
                },
                area: {
                  show: true,
                  opacity: 0.25,
                }
              },
              {
                yVals: [10, 30, 20, 40, 0, 15, 35, 40, 35, 15, 10, 0],
                line: {
                  show: true,
                  opacity: 0.5,
                },
                area: {
                  show: true,
                  opacity: 0.25,
                }
              },
            ]}
          />
        </div>
        <div className="time-slider__value --icon-chevron-down--iron">
          {this.showTime(this.state.value)}
          <p className="date">Friday 7</p>
        </div>
      </div>
    );
  }
}

SpotTimeSlider.defaultProps = {
  value: 12,
}

SpotTimeSlider.propTypes = {
  value: PropTypes.number,
}

export default SpotTimeSlider;
