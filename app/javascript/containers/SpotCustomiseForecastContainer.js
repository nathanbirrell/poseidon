import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Route } from 'react-router-dom';

import Modal from 'components/Modal';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Row from 'components/Row';''

class SpotCustomiseForecastContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOverallRating: this.props.forecastConfig.showOverallRating,
      showNightAndDay: this.props.forecastConfig.showNightAndDay,
      isOpen: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.updateForecastConfig = this.updateForecastConfig.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleToggle() {
    if (this.state.isOpen) {
      this.updateForecastConfig();
    }
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

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
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
            <h5>Graph</h5>
            <label>
              <input type="checkbox" name="showOverallRating" checked={this.state.showOverallRating} onChange={this.handleInputChange} />
              Show overall rating
            </label>
            <label>
              <input type="checkbox" name="showNightAndDay" checked={this.state.showNightAndDay} onChange={this.handleInputChange} />
              Show night and day
            </label>
          </form>
        </Modal>
      </div>
    );
  }
}

SpotCustomiseForecastContainer.defaultProps = {
    showOverallRating: null,
    showNightAndDay: null,
};

SpotCustomiseForecastContainer.PropTypes = {
  forecastConfig: PropTypes.object,
  updateParent: PropTypes.func,
};

export default SpotCustomiseForecastContainer;
