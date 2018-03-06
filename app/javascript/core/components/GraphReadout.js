import React from 'react';
import PropTypes from 'prop-types';

import Rating from 'core/components/Rating';

class GraphReadout extends React.PureComponent {
  render() {
    return (
      <div className="area-graph-readout-card" >
        { this.props.rating ? <Rating rating={this.props.rating} /> : null }
        { this.props.values.map(item => {
          return (
            <p key={item.name}>{item.value}{item.unit || null}</p>
          );
        })}
      </div>
    );
  }
}

GraphReadout.defaultProps = {
  rating: null,
  values: [],
};

GraphReadout.propTypes = {
  rating: PropTypes.number,
  values: PropTypes.array,
};

export default GraphReadout;