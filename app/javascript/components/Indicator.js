import React from 'react';
import SpotUtil from 'lib/SpotUtil';

class Indicator extends React.PureComponent {
  render() {
    if (!this.props.rating) { return null; }

    const rating = Math.round(this.props.rating / 10);

    return (
      <span className="indicator" style={{ background: SpotUtil.getRatingColor(rating) }} />
    );
  }
};

export default Indicator;