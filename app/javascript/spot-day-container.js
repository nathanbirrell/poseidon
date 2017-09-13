import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import MathUtil from 'math-util.js';
import SpotUtil from 'spot-util.js';

import SpotInfoCard from './spot-info-card';

class SpotDayContainer extends React.Component {
  render() {
    if (!this.props.forecasts) {
      return (
        <div id="current-section" className="row">
          <SpotInfoCard title='Swell' isBusy />
          <SpotInfoCard title='Wind' isBusy />
          <SpotInfoCard title='Tide' isBusy />
        </div>
      );
    }

    const current_swell = this.props.forecasts.swells[this.props.selectedTime];
    const current_wind = this.props.forecasts.winds[this.props.selectedTime];
    const current_tide =  this.props.forecasts.tides[this.props.selectedTime];

    return (
      <div id="today-section" className="row">
        <SpotInfoCard
          title='Swell'
          secondary={SpotUtil.swellFeetToDescription(SpotUtil.metresToFeet(current_swell.size))}
          rating={MathUtil.round(current_swell.rating, 0)}
          date_time={moment(current_swell.date_time).format("ddd h:mm a")}
          data={[
            {
              title: 'Rating',
              indicator: SpotUtil.getVerdict(current_swell.rating),
              prefix: '',
              values: [{
                value: MathUtil.round(current_swell.rating, 0),
                unit: '%',
              }],
              subtext: `${SpotUtil.getPotential(current_swell.rating)} potential`,
            },
            {
              title: 'Wave height',
              indicator: SpotUtil.getVerdict(current_swell.size_rating),
              prefix: '',
              values: [{
                value: MathUtil.round(SpotUtil.metresToFeet(current_swell.size), 1),
                unit: 'ft',
              }],
              subtext: `@ ${MathUtil.round(current_swell.period, 1)} seconds`,
              // optimum_vis: [{
              //   label: '',
              //   type: 'linear',
              //   min: optimals.swell.size.min,
              //   max: optimals.swell.size.max,
              //   mix_min: optimals.swell.size.mixed_min,
              //   mix_max: optimals.swell.size.mixed_max,
              //   opt_min: optimals.swell.size.optimal_min,
              //   opt_max: optimals.swell.size.optimal_max,
              //   value: MathUtil.round(current_swell.size, 1),
              //   unit: "m",
              //   roc_value: optimals.swell.size.in_3_hours,
              //   roc: (optimals.swell.size.in_3_hours - current_swell.size),
              //   roc_direction: SpotUtil.getRocDirection(optimals.swell.size.in_3_hours - current_swell.size),
              // }]
            },
            {
              title: 'Direction',
              indicator: SpotUtil.getVerdict(current_swell.direction_rating),
              prefix: '',
              values: [{
                value: SpotUtil.degreesToText(current_swell.direction),
                unit: '',
              }],
              subtext: `${current_swell.direction} deg`,
              // optimum_vis: [{
              //   label: '',
              //   type: 'direction',
              //   min: optimals.swell.direction.min,
              //   max: optimals.swell.direction.max,
              //   mix_min: optimals.swell.direction.mixed_min,
              //   mix_max: optimals.swell.direction.mixed_max,
              //   opt_min: optimals.swell.direction.optimal_min,
              //   opt_max: optimals.swell.direction.optimal_max,
              //   value: current_swell.direction,
              //   unit: "deg",
              //   min_label: SpotUtil.degreesToText(optimals.swell.direction.min),
              //   max_label: SpotUtil.degreesToText(optimals.swell.direction.max),
              //   roc_value: optimals.swell.direction.in_3_hours,
              //   roc: (optimals.swell.direction.in_3_hours - current_swell.direction),
              //   roc_direction: SpotUtil.getRocDirection(optimals.swell.direction.in_3_hours - current_swell.direction),
              // }]
            }
          ]}
        />
        <SpotInfoCard
          title='Wind'
          secondary={SpotUtil.windKphToDescription(current_wind.speed)}
          rating={MathUtil.round(current_wind.rating, 0)}
          date_time={moment(current_wind.date_time).format("ddd h:mm a")}
          data={[
            {
              title: 'Rating',
              indicator: SpotUtil.getVerdict(current_wind.rating),
              prefix: '',
              values: [{
                value: MathUtil.round(current_wind.rating, 0),
                unit: '%',
              }],
              subtext: `${SpotUtil.getPotential(current_wind.rating)} potential`,
            },
            {
              title: 'Wind speed',
              indicator: SpotUtil.getVerdict(current_wind.speed_rating),
              prefix: '',
              values: [{
                value: MathUtil.round(SpotUtil.kphToKnots(current_wind.speed), 0),
                unit: 'kts',
              }],
              subtext: `${current_wind.speed} kph`,
              // optimum_vis: [{
              //   label: '',
              //   type: 'linear',
              //   min: optimals.wind.speed.min,
              //   max: optimals.wind.speed.max,
              //   mix_min: optimals.wind.speed.mixed_min,
              //   mix_max: optimals.wind.speed.mixed_max,
              //   opt_min: optimals.wind.speed.optimal_min,
              //   opt_max: optimals.wind.speed.optimal_max,
              //   value: current_wind.speed,
              //   unit: "kph",
              //   roc_value: optimals.wind.speed.in_3_hours,
              //   roc: (optimals.wind.speed.in_3_hours - current_wind.speed),
              //   roc_direction: SpotUtil.getRocDirection(optimals.wind.speed.in_3_hours - current_wind.speed),
              // }]
            },
            {
              title: 'Direction',
              indicator: SpotUtil.getVerdict(current_wind.direction_rating),
              prefix: '',
              values: [{
                value:  SpotUtil.degreesToText(current_wind.direction),
                unit: '',
              }],
              subtext: `${current_wind.direction} deg`,
              // optimum_vis: [{
              //   label: '',
              //   type: 'direction',
              //   min: optimals.wind.direction.min,
              //   max: optimals.wind.direction.max,
              //   mix_min: optimals.wind.direction.mixed_min,
              //   mix_max: optimals.wind.direction.mixed_max,
              //   opt_min: optimals.wind.direction.optimal_min,
              //   opt_max: optimals.wind.direction.optimal_max,
              //   value: current_wind.direction,
              //   unit: "deg",
              //   min_label: SpotUtil.degreesToText(optimals.wind.direction.min),
              //   max_label: SpotUtil.degreesToText(optimals.wind.direction.max),
              //   roc_value: optimals.wind.direction.in_3_hours,
              //   roc: (optimals.wind.direction.in_3_hours - current_wind.direction),
              //   roc_direction: SpotUtil.getRocDirection(optimals.wind.direction.in_3_hours - current_wind.direction),
              // }]
            }
          ]}
        />
        <SpotInfoCard
          title='Tide'
          secondary={current_tide.state}
          rating={MathUtil.round(current_tide.rating, 0)}
          date_time={moment(current_tide.date_time).format("ddd h:mm a")}
          data={[
            {
              title: 'Rating',
              indicator: SpotUtil.getVerdict(current_tide.rating),
              prefix: '',
              values: [{
                value: MathUtil.round(current_tide.rating, 0),
                unit: '%',
              }],
              subtext: `${SpotUtil.getPotential(current_tide.rating)} potential`,
            },
            {
              title: 'Tide height',
              indicator: SpotUtil.getVerdict(current_tide.rating),
              prefix: '',
              values: [{
                value: current_tide.height,
                unit: 'm',
              }],
              subtext: `${current_tide.shift_rate} shift`,
              // optimum_vis: [{
              //   label: '',
              //   type: 'linear',
              //   min: optimals.tide.height.min,
              //   max: optimals.tide.height.max,
              //   mix_min: optimals.tide.height.mixed_min,
              //   mix_max: optimals.tide.height.mixed_max,
              //   opt_min: optimals.tide.height.optimal_min,
              //   opt_max: optimals.tide.height.optimal_max,
              //   value: this.state.data.current_tide_snapshot.height,
              //   unit: "m",
              //   roc_value: optimals.tide.height.in_3_hours,
              //   roc: (optimals.tide.height.in_3_hours - this.state.data.current_tide_snapshot.height),
              //   roc_direction: SpotUtil.getRocDirection(optimals.tide.height.in_3_hours - this.state.data.current_tide_snapshot.height),
              // }]
            },
            {
              title: 'Next tide',
              indicator: '',
              prefix: '',
              values: [{
                value: moment(this.props.forecasts.tides[this.props.selectedTime + 1].date_time).format("h:mm"),
                unit: moment(this.props.forecasts.tides[this.props.selectedTime + 1].date_time).format("a"),
              }],
              subtext: moment(this.props.forecasts.tides[this.props.selectedTime + 1].date_time).fromNow(),
              // optimum_vis: [
              //
              // ]
            }
          ]}
        />
      </div>
    );
  }
}

SpotDayContainer.defaultProps = {
  data: null,
};

SpotDayContainer.PropTypes = {
  data: PropTypes.object,
};

export default SpotDayContainer;
