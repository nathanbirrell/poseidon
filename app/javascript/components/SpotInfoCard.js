import React from 'react';
import PropTypes from 'prop-types';

import SpotUtil from 'lib/SpotUtil';

import MiniOptimumVisual from 'components/MiniOptimumVisual';
import OptimumVisual from 'components/OptimumVisual';
import Spinner from 'components/Spinner';

class SpotInfoCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this._renderExpandedSection = this._renderExpandedSection.bind(this);
    this._renderExpandedSectionButton = this._renderExpandedSectionButton.bind(this);
  }

  _renderMiniOptimums(d) {
    if (!d) {
      return null;
    }
    return (
      d.optimum_vis && d.optimum_vis.map((opt, k) => {
        return (
          <div className="--hide-expanded" key={k}>
            <MiniOptimumVisual data={opt}/>
          </div>
        );
      })
    );
  }

  _renderDatapoints() {
    if (!this.props.data) {
      return null;
    }
    return this.props.data.map((d, i) => {
      return (
        <div className="datapoint" key={i}>
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
        </div>
      );
    });
  }

  _renderExpandedSection() {
    if (this.props.data) {
      return (
        <div className="row info-card__expanded-section">
          <div className="small-11 small-centered cell">
            {this.props.data.map((d, i) => {
                return (
                  d.optimum_vis && d.optimum_vis.map((opt, k) => {
                    return (
                      <div key={k}>
                        <OptimumVisual data={opt}/>
                      </div>
                    );
                  })
                );
            })}
          </div>
        </div>
      );
    }
  }

  _renderExpandedSectionButton() {
    return (
      <a className="link expand-button" onClick={() => {this.toggleExpanded()}}>{this.state.expanded ? 'Show less' : 'Show more'}</a>
    );
  }

  toggleExpanded() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    if (this.props.isBusy || !this.props.data) {
      return (
        <div className="small-12 large-4 cell">
          <div className="info-card">
            <div className="info-card__top">
              <h3>{this.props.title}</h3>
            </div>
            <Spinner />
          </div>
        </div>
      );
    }

    return (
      <div className="small-12 large-4 cell">
        <div className={"info-card " + (this.state.expanded ? '--expanded' : '')}>
          <div className={`info-card__top --${SpotUtil.getVerdict(this.props.rating)}`}>
            <h3>{this.props.title}</h3>
            <span className="text-right">{this.props.secondary} | {this.props.date_time}</span>
          </div>

          <div className="info-card__body">
            {this._renderDatapoints()}
          </div>
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
  isBusy: false,
}

SpotInfoCard.propTypes = {
  title: PropTypes.string,
  secondary: PropTypes.string,
  rating: PropTypes.number,
  date_time: PropTypes.string,
  data: PropTypes.array,
  isBusy: PropTypes.bool,
}

export default SpotInfoCard;
