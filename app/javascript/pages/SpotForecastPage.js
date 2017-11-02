import React from 'react';
import SpotForecastContainer from 'containers/SpotForecastContainer';
import SpotShareContainer from 'containers/SpotShareContainer';
import SessionCard from 'components/SessionCard';

class SpotForecastPage extends React.Component {
  render() {
    return (
      <div className="spot-page__forecast">
        <SpotForecastContainer
          forecasts={this.state.forecasts}
        />
        <SessionCard
          isExpanded
          rating={this.state.forecasts.overall_ratings[seed.value]}
          swell={this.state.forecasts.swells[seed.value]}
          wind={this.state.forecasts.winds[seed.value]}
          tide_current={this.state.forecasts.tides[seed.value]}
        />
        <SpotShareContainer
          selectedMoment={date}
          spotName={this.state.spot.name}
        />
      </div>
    );
  }
}

export default SpotForecastPage;