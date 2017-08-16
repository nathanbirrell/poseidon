import React from 'react';
import PropTypes from 'prop-types';

import SpotInfoCard from './spot-info-card-react';
import SpotTimeSlider from './spot-time-slider';

class SpotContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
    };

    this.syncData = this.syncData.bind(this);
  }

  componentDidMount() {
    let apiCall = this.syncData();
    apiCall.then((data) => {
      this.setState({
        data: JSON.parse(data),
      });
    });
  }

  syncData() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", window.location.href + '.json');
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  };

  render() {
    if (!this.state.data) {
      return null;
    }

    const current_swell = this.state.data.current_swell;
    const current_wind = this.state.data.current_wind;

    return(
      <div>
        <SpotInfoCard
          title='Swell'
          secondary='secondary_here'
          rating={99}
          datetime={current_swell.date_time}
          data={[
            {
              title: 'Wave height',
              indicator: 'indicator_here',
              prefix: '',
              values: [{
                value: current_swell.size,
                unit: 'm',
              }],
              subtext: `@ ${current_swell.period}`,
              optimum_vis: [

              ]
            },
            {
              title: 'Direction',
              indicator: 'indicator_here',
              prefix: '',
              values: [{
                value: current_swell.direction,
                unit: '',
              }],
              subtext: `@ ${current_swell.direction}`,
              optimum_vis: [

              ]
            }
          ]}
        />
        <SpotInfoCard
          title='Wind'
          secondary='secondary_here'
          rating={99}
          datetime={current_wind.date_time}
          data={[
            {
              title: 'Wind speed',
              indicator: 'indicator_here',
              prefix: '',
              values: [{
                value: current_wind.speed,
                unit: 'kts',
              }],
              subtext: `${current_wind.speed} kph`,
              optimum_vis: [

              ]
            },
            {
              title: 'Direction',
              indicator: 'indicator_here',
              prefix: '',
              values: [{
                value: current_wind.direction,
                unit: '',
              }],
              subtext: `${current_wind.direction} deg`,
              optimum_vis: [

              ]
            }
          ]}
        />
        <SpotInfoCard title='Tide' />
        <SpotTimeSlider />
      </div>
    );
  }
}

export default SpotContainer;
