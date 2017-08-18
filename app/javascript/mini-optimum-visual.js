import React from 'react';
import PropTypes from 'prop-types';

class MiniOptimumVisual extends React.Component {
  render() {
    if (!this.props.data) {
      return null;
    }

    console.log('MiniOptimumVisual', this.props.data);

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

    return (
      <div className="optimum-vis <%= value < min || value > max ? '--outside' : '--inside'%>">
        <div className="optimum-vis__visual --mini">
          <div className="data-vis">
            <div className="data-vis__bg --neg --mini" style={leftNegStyle}></div>
            <div className="data-vis__bg --mix --mini" style={leftMixStyle}></div>
            <div className="data-vis__bg --pos --mini" style={posStyle}></div>
            <div className="data-vis__bg --mix --mini" style={rightMixStyle}></div>
            <div className="data-vis__bg --neg --mini" style={rightNegStyle}></div>

            {data.value > data.min && data.value < data.max ?
              <div>
                <span className="data-vis__ROC --mini --<%= roc_direction %>" style={rocStyle}></span>
                <span className="data-vis__current --mini" style={currentStyle}></span>
              </div>
            : null}
          </div>
        </div>
      </div>
    );
  }
}

MiniOptimumVisual.defaultProps = {
  data: null,
}

MiniOptimumVisual.propTypes = {
  data: PropTypes.object,
}

export default MiniOptimumVisual;
