import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import AreaGraph from 'core/components/AreaGraph';

class SpotTimeSlider extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      dateValue: this.props.seedTime.diff(moment(), 'days'),
      timeValue: this.props.seedTime.format("H"),
      selectedDateTime: this.props.seedTime
    };

    this.createNewMoment = this.createNewMoment.bind(this);
    this.handleChangeHours = this.handleChangeHours.bind(this);
    this.handleChangeDays = this.handleChangeDays.bind(this);
  }

  createNewMoment(hours, days) {
    let newDateTime = moment().set({
      'hour': hours,
      'minute': 0,
      'second': 0,
      'millisecond': 0
    });
    newDateTime.add(days, 'd');
    return newDateTime;
  }

  handleChangeHours(event) {
    const output = this.createNewMoment(event.target.value, this.state.dateValue);
    this.props.updateParent(output);
    this.setState({
      timeValue: event.target.value,
      selectedDateTime: output,
    });
  }

  handleChangeDays(event) {
    const output = this.createNewMoment(this.state.timeValue, event.target.value);
    this.props.updateParent(output);
    this.setState({
      dateValue: event.target.value,
      selectedDateTime: output,
    });
  }

  render() {
    if (!this.props.curveData || !this.props.updateParent) {
      return null;
    }

    const sliderData = this.props.curveData.map(d => {
      return d.rating;
    });

    console.log("selectedDateTime", this.state.selectedDateTime.format("dd hh:mm a"));

    return (
      <div className="time-slider">
        <div id="time-slider__input" className={"time-slider__time-input " + (this.state.timeValue < 12.5 ? "left-aligned" : '') + (this.state.timeValue > 12.5 ? "right-aligned" : '')}>
          <input
            type="range"
            min="2"
            max="23"
            step="3"
            value={this.state.timeValue}
            onChange={this.handleChangeHours}>
          </input>
          <div id="time-slider-graph-container" className="time-slider-graph-container" />
          <AreaGraph
            cssSelector='time-slider-graph'
            targetId='time-slider-graph-container'
            graphs={[
              {
                yVals: sliderData,
                yMax: 110,
                line: {
                  show: true,
                },
                area: {
                  show: true,
                },
                points: {
                  show: false,
                },
                color: '#2278F1'
              }
            ]}
            forecastDays={1}
            showAxes={false}
          />
        </div>
        <div className="time-slider__value">
          <select
              className="time-slider__date-select"
              onChange={this.handleChangeDays}
              value={this.state.dateValue}
            >
            <option value="0">Today</option>
            <option value="1">{moment().add(1, 'd').format("ddd D")}</option>
            <option value="2">{moment().add(2, 'd').format("ddd D")}</option>
            <option value="3">{moment().add(3, 'd').format("ddd D")}</option>
            <option value="4">{moment().add(4, 'd').format("ddd D")}</option>
          </select>
          <span className="time">{this.state.selectedDateTime.format("h:mm")}<span className="sub"> {this.state.selectedDateTime.format("a")}</span></span>
        </div>
      </div>
    );
  }
}

SpotTimeSlider.defaultProps = {
  seedTime: moment()
}

SpotTimeSlider.propTypes = {
  curveData: PropTypes.array.isRequired,
  updateParent: PropTypes.func.isRequired,
  seedTime: PropTypes.object,
}

export default SpotTimeSlider;
