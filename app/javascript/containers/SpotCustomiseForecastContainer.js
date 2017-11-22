import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Route } from 'react-router-dom';

import Modal from 'components/Modal';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Row from 'components/Row';''

class SpotShareContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOverallRating: this.props.shareOverallRating,
      isOpen: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.updateForecastConfig = this.updateForecastConfig.bind(this);
  }

  handleToggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  updateForecastConfig() {
    this.props.updateParent({
      showOverallRating: this.state.showOverallRating,
      showNightAndDay: this.state.showNightAndDay,
    });
  }

  render() {
    return (
      <div className="display-inline">
        <Button type={Button.Type.SECONDARY} onClick={this.handleToggle}>
          <Icon name="edit" size={Icon.Size.MEDIUM} />
          Customise
        </Button>

        <Modal
          isOpen={this.state.isOpen}
          toggleOpen={this.handleToggle}
          header="Customise Forecasts"
        >
          <form>
            <label>
              <input type="checkbox" checked={this.state.showOverallRating} />
              Show overall rating
            </label>
            <label>
              <input type="checkbox" checked={this.state.showNightAndDay} />
              Show night and day
            </label>
          </form>
        </Modal>
      </div>
    );
  }
}

SpotShareContainer.defaultProps = {
    showOverallRating: true,
    showNightAndDay: true,
};

SpotShareContainer.PropTypes = {
  showOverallRating: PropTypes.bool,
  showNightAndDay: PropTypes.bool,
  updateParent: PropTypes.func,
};

export default SpotShareContainer;
