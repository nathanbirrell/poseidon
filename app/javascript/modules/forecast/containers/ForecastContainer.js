import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Element } from 'react-scroll';

import moment from 'moment';

import UrlUtil from 'lib/UrlUtil';

import Row from 'core/components/Row';
import Column from 'core/components/Column';
import Spinner from 'core/components/Spinner';
import SessionCard from 'core/components/SessionCard';
import GenericErrorMessage from 'core/components/GenericErrorMessage';
import ShareSession from 'core/components/ShareSession';

import * as SurfForecastActions from 'actions/ForecastActions';
import * as SpotActions from 'actions/SpotActions';

import ForecastGraphs from 'modules/forecast/components/ForecastGraphs';

class ForecastContainer extends React.Component {
  constructor(props) {
    super(props);

    this.findForecastSeedFromTime = this.findForecastSeedFromTime.bind(this);
  }

  componentDidMount() {
    // Temporarily disabling these checks because they break the navigation thru the app (FIXME)
    // if (!this.props.forecasts) {
    this.props.dispatch(SurfForecastActions.fetchSurfForecast(this.props.match.params.spotId));
    this.props.dispatch(SpotActions.fetchSpot(this.props.match.params.spotId));

    this.initTime();
  }

  /**
   * Retrieves current time, or time in URL if set
   */
  getTime() {
    let query = UrlUtil.searchParams.get('date_time');
    if (query !== null) {
      query = query.replace(/\s+/g, '+');
      const output = moment(query);
      if (output._isValid) {
        return output;
      }
    }
    return moment();
  }

  initTime() {
    if (this.props.forecasts.selectedDateTime) { return; }

    const time = this.getTime();
    this.props.actions.updateSelectedDateTime(time);
  }

  findForecastSeedFromTime(data, time) {
    console.log(data, time);
    let value = null;
    const sortedResult = data.slice().sort((a, b) => {
      const dA = Math.abs(moment(a.date_time).utc() - time);
      const dB = Math.abs(moment(b.date_time).utc() - time);
      if (dA < dB) {
        return -1;
      } else if (dA > dB) {
        return 1;
      }
      return 0;
    });

    value = data.indexOf(sortedResult[0]);

    return {
      value,
      time: data[value].date_time,
    };
  }

  render() {
    if (this.props.isError) {
      return <GenericErrorMessage reload={window.location.reload.bind(window.location)} />;
    }

    if (!this.props.forecasts.data || !this.props.forecasts.selectedDateTime) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }

    const date = this.props.forecasts.selectedDateTime;
    // TODO: rename to selectedForecast ?? Discuss w/ TB. ie selectedForecast.index (instead of value), etc.
    const seed = this.findForecastSeedFromTime(this.props.forecasts.data.swells, date);

    // Put data through time filter here
    // const filteredData = this.state.forecasts.overall_ratings.filter(item => moment(item.date_time).isBetween(moment(date).startOf('day'), moment(date).endOf('day')));

    return (
      <Row className="spot-page__forecast" withXPadding={false}>
        <Column widthMedium={12} widthLarge={6}>
          <SessionCard
            isExpanded
            rating={this.props.forecasts.data.overall_ratings[seed.value]}
            swell={this.props.forecasts.data.swells[seed.value]}
            wind={this.props.forecasts.data.winds[seed.value]}
            tide_current={this.props.forecasts.data.tides[seed.value]}
          />
        </Column>

        <Column widthSmall={12} widthMedium={12} widthLarge={12}>
          <Element name="forecast-graph-card">
            <ForecastGraphs
              spot={this.props.spot.data}
              forecasts={this.props.forecasts.data}
              updateParent={this.props.actions.updateSelectedDateTime}
              selectedDateTimePosition={seed.value}
              // forecastConfig={this.state.forecastConfig}
            />
          </Element>
        </Column>

        <Row withColumn>
          <Column widthMedium={6} widthLarge={4}>
            <ShareSession
              selectedMoment={date}
              spotName={this.props.spot.data.name}
            />
          </Column>
        </Row>
      </Row>
    );
  }
}

ForecastContainer.defaultProps = {
  forecasts: null,
  isError: false,
  spot: null,
};

ForecastContainer.propTypes = {
  spot: PropTypes.object,
  forecasts: PropTypes.object,
  isSyncing: PropTypes.bool.isRequired,
  isError: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (store) => {
  const { forecasts, spot } = store;

  return {
    spot,
    forecasts,
    isError: forecasts.syncError || spot.syncError,
    isSyncing: forecasts.isSyncing || spot.isSyncing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(SurfForecastActions, dispatch),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForecastContainer);