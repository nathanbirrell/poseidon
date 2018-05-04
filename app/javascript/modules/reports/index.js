import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Row from 'core/components/Row';
import Column from 'core/components/Column';
import Spinner from 'core/components/Spinner';
import Button from 'core/components/Button';
import GenericErrorMessage from 'core/components/GenericErrorMessage';

import * as SpotActions from 'actions/SpotActions';

class SpotReportsContainer extends React.Component {
  componentDidMount() {
    if (!this.props.spot.name) {
      this.props.dispatch(SpotActions.fetchSpot(this.props.match.params.spotId));
    }
  }

  render() {
    if (this.props.isError) {
      return <GenericErrorMessage reload={window.location.reload.bind(window.location)} />;
    }

    if (!this.props.spot.name || this.props.isSyncing) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }

    return (
      <Row id="today-section" className="text-center">
        <Column isAutoMediumUp />
        <Column widthMedium={5} widthLarge={5}>
          <h2 className="--small">{this.props.spot.name} surf reports coming soon</h2>

          <br /><br />

          <h3>Live near {this.props.spot.name}?</h3>

          <Button type={Button.Type.SECONDARY} href="http://eepurl.com/dbMF59">Become a Local Reporter</Button>
        </Column>
        <Column isAutoMediumUp />
      </Row>
    );
  }
}

SpotReportsContainer.defaultProps = {
};

SpotReportsContainer.propTypes = {
  spot: PropTypes.object.isRequired,
  isSyncing: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    spot: state.spot.data,
    isError: state.spot.isError,
    isSyncing: state.spot.isSyncing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(SpotActions, dispatch),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpotReportsContainer);