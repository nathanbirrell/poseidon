import React from 'react';
import PropTypes from 'prop-types';

import SpotUtil from 'spot-util.js';

import MiniOptimumVisual from './mini-optimum-visual';
import OptimumVisual from './optimum-visual';

class SpotInfoCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this._renderExpandedSection = this._renderExpandedSection.bind(this);
  }

  _renderDatapoints() {
    if (this.props.data) {
      return this.props.data.map((d, i) => {
        return (
          <div className="small-4 columns datapoint" key={i}>
            <p className={`title sub-text --${d.indicator}`}>{d.title}</p>
            <p className="main-text">
              {d.prefix}
              {d.values && d.values.map((v, j) => {
                return (
                  <span key={j}>{v.value}<span className="value-unit">{v.unit}</span></span>
                );
              })}
            </p>
            <p className="sub-text">{d.subtext}</p>

            {d.optimum_vis.map((opt, k) => {
              return (
                <div className="--hide-expanded" key={k}>
                  <MiniOptimumVisual data={opt}/>
                </div>
              );
            })}
          </div>
        );
      });
    }
  }

  _renderExpandedSection() {
    if (this.props.data) {
      return (
        <div className="row info-card__expanded-section">
          <div className="small-11 small-centered columns">
            {this.props.data.map((d, i) => {
                return d.optimum_vis.map((opt, k) => {
                  return (
                    <div key={k}>
                      <OptimumVisual data={opt}/>
                    </div>
                  );
                })
            })}
          </div>
        </div>
      );
    }
  }

  toggleExpanded() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    if (!this.props.title) {
      return (
        <div className="small-12 medium-6 large-4 columns">
        <div className="info-card">
          <div className="info-card__top">
            <h3></h3>
            <span className="text-right">
            </span>
          </div>

          <div className="row info-card__body">
            <div className="small-4 columns">
            </div>
            {this._renderDatapoints()}
            {this._renderExpandedSection()}
          </div>
          <a className="link expand-button" onClick={() => {this.toggleExpanded()}}></a>
        </div>
      </div>
      );
    }

    return (
      <div className="small-12 medium-6 large-4 columns">
        <div className={"info-card " + (this.state.expanded ? '--expanded' : '')}>
          <div className={`info-card__top --${SpotUtil.getVerdict(this.props.rating)}`}>
            <h3>{this.props.title}</h3>
            <span className="text-right">
              {this.props.secondary} @ {this.props.date_time}
            </span>
          </div>

          <div className="row info-card__body">
            <div className="small-4 columns">
              {this.props.rating < 30 ?
                <span>BELOW 30</span>
              : this.props.rating}
            </div>
            {this._renderDatapoints()}
            {this._renderExpandedSection()}
          </div>
          <a className="link expand-button" onClick={() => {this.toggleExpanded()}}>{this.state.expanded ? 'Show less' : 'Show more'}</a>
        </div>
      </div>
    );
  }
}

SpotInfoCard.defaultProps = {
  title: '',
  secondary: '',
  rating: null,
  date_time: '',
  data: null,
}

SpotInfoCard.propTypes = {
  title: PropTypes.string,
  secondary: PropTypes.string,
  rating: PropTypes.number,
  date_time: PropTypes.string,
  data: PropTypes.array,
}

export default SpotInfoCard;
