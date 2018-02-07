import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'core/components/Modal';
import Button from 'core/components/Button';
import Icon from 'core/components/Icon';

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
          <Icon name="edit" size={Icon.Size.MEDIUM} color="grey" />
        </Button>

        <Modal
          isOpen={this.state.isOpen}
          toggleOpen={this.handleToggle}
          header="Customise Forecasts"
        >
          <form>
            <h5>Graphs</h5>
            <table>
              <tbody>
                <tr>
                  <td>
                    <input className="input" type="checkbox" name="showOverallRating" checked={this.state.showOverallRating} onChange={this.handleInputChange} />
                  </td>
                  <td>
                    <h6>Overall rating</h6>
                    Show overall spot potential data
                  </td>
                </tr>
                <tr>
                  <td>
                    <input className="input" type="checkbox" name="showNightAndDay" checked={this.state.showNightAndDay} onChange={this.handleInputChange} />
                  </td>
                  <td>
                    <h6>Night and Day</h6>
                    Show data for night-time hours
                  </td>
                </tr>
                <tr>
                  <td>
                    <input className="input" type="checkbox" name="showSwellAndWind" checked={this.state.showSwellAndWind} onChange={this.handleInputChange} />
                  </td>
                  <td>
                    <h6>Show swell and wind</h6>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </Modal>
      </div>
    );
  }
}

SpotCustomiseForecastContainer.defaultProps = {
  forecastConfig: null,
  updateParent: null,
};

SpotCustomiseForecastContainer.propTypes = {
  forecastConfig: PropTypes.object,
  updateParent: PropTypes.func,
};

export default SpotCustomiseForecastContainer;
