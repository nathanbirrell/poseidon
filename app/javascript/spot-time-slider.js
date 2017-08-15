import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

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
