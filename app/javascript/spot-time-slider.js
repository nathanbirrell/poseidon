import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import AreaGraph from './area-graph';

class SpotTimeSlider extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      seed: this.props.seed,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let value = event.target.value;
    let startOfDay = new Date();
    let selectedDateTime = moment(startOfDay.setHours(value,0,0,0));
    this.props.updateParent(selectedDateTime);
    this.setState({
      value
    });
  }

  showTime(number) {
    let hours = number > 12 ? number - 12 : number;
    let minutes = '00';

    return (
      <span className="time">
        <span>{hours}</span>:<span>{minutes}</span>
      </span>
    );
  }

  render() {
    if (!this.props.curveData || !this.props.updateParent) {
      return null;
    }

    return (
      <div className="time-slider">
        <div id="time-slider__input" className="time-slider__input">
          <input
            type="range"
            min="4"
            max="22"
            step="3"
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
                  show: false,
                },
                area: {
                  show: true,
                  opacity: 0.18,
                },
                points: {
                  show: false,
                }
              }
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
}

SpotTimeSlider.propTypes = {
  curveData: PropTypes.array.isRequired,
  updateParent: PropTypes.func.isRequired,
}

export default SpotTimeSlider;
