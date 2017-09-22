import React from 'react';
import PropTypes from 'prop-types';

const Row = (props) => {
  const { children } = props;
  return (
    <div className="row">
      {children}
    </div>
  );
}

Row.defaultProps = {
  children: null,
};

Row.PropTypes = {
  children: PropTypes.node,
};

export default Row;
