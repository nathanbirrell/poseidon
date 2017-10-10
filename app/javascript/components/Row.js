import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

const Row = (props) => {
  const { children, withXPadding, withYPadding } = props;

  const classes = Classnames({
    'grid-x': true,
    'grid-padding-x': withXPadding,
    'grid-padding-y': withYPadding,
  });
  return (
    <div className={classes}>
      {children}
    </div>
  );
}

Row.defaultProps = {
  children: null,
  withXPadding: false,
  withYPadding: false,
};

Row.PropTypes = {
  children: PropTypes.node,
  withXPadding: PropTypes.bool,
  withYPadding: PropTypes.bool,
};

export default Row;
