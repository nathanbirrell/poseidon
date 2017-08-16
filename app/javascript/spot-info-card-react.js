import React from 'react';
import PropTypes from 'prop-types';

import MiniOptimumVisual from './mini-optimum-visual';
import OptimumVisual from './optimum-visual';

class SpotInfoCard extends React.Component {
  _renderDatapoints() {
    if (this.props.data) {
      return this.props.data.map((d, i) => {
        return (
          <div className="small-4 columns datapoint" key={i}>
            <p className="title sub-text --<%= d[:indicator] %>">{d.title}</p>
            <p className="main-text">
              {d.prefix}
              {d.values && d.values.map((v, j) => {
                return (
                  <span key={j}>{v.value}<span className="value-unit">{v.unit}</span></span>
                );
              })}
            </p>
            <p className="sub-text">{d.subtext}</p>

            {d.optimum_vis ?
              d.optimum_vis.map((opt, k) => {
                <div className="--hide-expanded" key={k}>
                  <MiniOptimumVisual data={opt}/>
                </div>
              })
            : null}
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
              {d.optimum_vis ?
                d.optimum_vis.map((opt, k) => {
                  <div key={k}>
                    <OptimumVisual data={opt}/>
                  </div>
                })
              : null}
            })}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="small-12 medium-6 large-4 columns">
        <div className="info-card">
          <div className="info-card__top --<%= get_verdict(rating) %>">
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
          <a className="link expand-button fn-expand-info-card">Show more</a>
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
