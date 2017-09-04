import React from 'react';
import PropTypes from 'prop-types';

class NavigationTabs extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fixed: false,
      selectedTab: this.props.selectedOnLoad,
    };

    this.update = this.update.bind(this);
  }

  update(number) {
    this.setState({
       selectedTab: number,
    });
    this.props.onChange(number);
  }

  render() {
    if (!this.props.items) {
      return null;
    }

    return (
      <div id="spot-toolbar" className={"row spot-toolbar " + (this.state.fixed ? '--fixed' : '')}>
        <div className="small-12 medium-5 columns">
          <div className="row">
            {this.props.items.map((i, j) => {
              return (
                <div key={j} className={"small-3 columns spot-toolbar__item " + (j === this.state.selectedTab ? '--focused' : '')} onClick={this.props.isBusy ? null : () => { this.update(j) }}>
                  <a>
                    <span className="spot-toolbar__label">{i}</span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

NavigationTabs.defaultProps = {
  isBusy: false,
  selectedOnLoad: 0,
}

NavigationTabs.propTypes = {
  items: PropTypes.array.isRequired,
  isBusy: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  selectedOnLoad: PropTypes.number,
}

export default NavigationTabs;
