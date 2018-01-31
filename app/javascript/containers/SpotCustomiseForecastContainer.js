import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Toggle from 'components/Toggle';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Icon from 'components/Icon';

class SpotCustomiseForecastContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.forecastConfig, // TODO: maybe better to drop this into its own object
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
      isOpen: !this.state.isOpen,
    });
  }

  updateForecastConfig() {
    this.props.updateParent({
      showOverallRating: this.state.showOverallRating,
      showNightAndDay: this.state.showNightAndDay,
      showSwellAndWind: this.state.showSwellAndWind,
    });
  }

  handleInputChange(event) {
    const { target } = event;
    const { name, checked, value } = target;
    const val = target.type === 'checkbox' ? checked : value;

    this.setState({
      [name]: val,
    });
  }

  render() {
    return (
      <div className="display-inline">
        <Button type={Button.Type.LINK} onClick={this.handleToggle} title="Customise Graph">
          {this.props.children}
          <Icon name="edit" size={Icon.Size.MEDIUM} color="grey" />
        </Button>

        <Modal
          isOpen={this.state.isOpen}
          toggleOpen={this.handleToggle}
          header="Customise Forecasts"
        >
          <form>
            <Toggle
              id="showOverallRating"
              toggled={this.state.showOverallRating}
              onChange={this.handleInputChange}
              description="Overall potential"
            />

            <Toggle
              id="showNightAndDay"
              toggled={this.state.showNightAndDay}
              onChange={this.handleInputChange}
              description="Night &amp; Day"
            />

            <Toggle
              id="showSwellAndWind"
              toggled={this.state.showSwellAndWind}
              onChange={this.handleInputChange}
              description="Swell &amp; Wind"
            />
          </form>
        </Modal>
      </div>
    );
  }
}

SpotCustomiseForecastContainer.defaultProps = {
  forecastConfig: null,
  updateParent: null,
  children: null,
};

SpotCustomiseForecastContainer.propTypes = {
  forecastConfig: PropTypes.object,
  updateParent: PropTypes.func,
  children: PropTypes.node,
};

export default SpotCustomiseForecastContainer;
