import React from 'react';
import PropTypes from 'prop-types';

class OptimumVisual extends React.Component {
  render() {
    if (!this.props.data) {
      return null;
    }

    const data = this.props.data;

    const leftNegStyle = {
      left: 0,
      width: `${(data.mix_min - data.min)/(data.max - data.min) * 100}%`,
    };
    const leftMixStyle = {
      left: `${(data.mix_min - data.min)/(data.max - data.min) * 100}%`,
      width: `${(data.opt_min - data.mix_min)/(data.max - data.min) * 100}%`,
    };
    const posStyle = {
      left: `${(data.opt_min - data.min)/(data.max - data.min) * 100}%`,
      width: `${(data.opt_max - data.opt_min)/(data.max - data.min) * 100}%`,
    };
    const rightMixStyle = {
      left: `${(data.opt_max - data.min)/(data.max - data.min) * 100}%`,
      width: `${(data.mix_max - data.opt_max)/(data.max - data.min) * 100}%`,
    };
    const rightNegStyle = {
      left: `${(data.mix_max - data.min)/(data.max - data.min) * 100}%`,
      width: `${(data.max - data.mix_max)/(data.max - data.min) * 100}%`,
    };

    const currentStyle = {
      left: `${(data.value - data.min)/(data.max-data.min) * 100}%`,
    };
    let rocLeft;
    if (data.roc_direction === 'right') {
      rocLeft = currentStyle.left;
    } else {
      rocLeft = `${(((data.value - data.min)/(data.max-data.min) * 100) - (Math.abs(data.roc))/(data.max-data.min) * 100)}%`;
    }
    const rocStyle = {
      left: rocLeft,
      width: `${(Math.abs(data.roc))/(data.max-data.min) * 100}%`,
    };


    let rocValueLeft;
    if (data.roc_direction === 'right') {
      rocValueLeft = `${(((data.value - data.min)/(data.max-data.min) * 100) + (Math.abs(data.roc))/(data.max-data.min) * 100)}%`;
    } else {
      rocValueLeft = rocLeft;
    }
    const rocValueStyle = {
      left: rocValueLeft,
    }

    const zeroStyle = {
      left: `${((0 - data.min)/(data.max - data.min) * 100)}%`,
    }

    return (
      <div className="optimum-vis <%= value < min || value > max ? '--outside' : '--inside'%>">
        {data.label ? <div className="optimum-vis__meta">{data.label}</div> : null}
        <div className="optimum-vis__visual">
          <div className="data-vis">
            <div className="data-vis__bg --neg" style={leftNegStyle}></div>
            <div className="data-vis__bg --mix" style={leftMixStyle}></div>
            <div className="data-vis__bg --pos" style={posStyle}></div>
            <div className="data-vis__bg --mix" style={rightMixStyle}></div>
            <div className="data-vis__bg --neg" style={rightNegStyle}></div>

            <div className="data-vis__bg --sectors"></div>
            <div className="data-vis__bg --sectors --bottom"></div>
            {data.value > data.min && data.value < data.max ?
              <div>
                <span className={`data-vis__ROC --${data.roc_direction}`} style={rocStyle}></span>
                <span className={`data-vis__ROC-value --${data.roc_direction}`} style={rocValueStyle}>{data.roc_value}{data.unit}</span>
                <span className="data-vis__current" style={currentStyle}>{data.value}{data.unit}</span>
              </div>
            : null}
          </div>
          <div className="optimum-vis__markings">
            {data.type === 'linear' && data.min < 0 ?
              <span className="optimum-vis__min --zero" style={zeroStyle}>0</span>
            :
              <span className="optimum-vis__min">{data.min_label || data.min}</span>
            }
            <span className="optimum-vis__max">{data.max_label || data.max}</span>
          </div>
        </div>
      </div>

    );
  }
}

OptimumVisual.defaultProps = {
  data: null,
}

OptimumVisual.propTypes = {
  data: PropTypes.object,
}

export default OptimumVisual;
