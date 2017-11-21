import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

import Column from 'components/Column';

const Row = (props) => {
  const { children, className, withXPadding, withYPadding, withXMargin, withYMargin } = props;

  const classes = Classnames({
    'grid-x': true,
    'grid-padding-x': withXPadding,
    'grid-padding-y': withYPadding,
    'grid-margin-x': withXMargin,
    'grid-margin-y': withYMargin,
    [`${props.className}`]: (className),
  });

  if (props.withColumn) {
    return (
      <div className={classes}>
        <Column widthMedium={12} widthLarge={12}>
          {children}
        </Column>
      </div>
    );
  }

  return (
    <div className={classes} style={props.style}>
      {children}
    </div>
  );
}

Row.defaultProps = {
  children: null,
  className: null,
  withXPadding: true,
  withYPadding: false,
  withXMargin: false,
  withYMargin: false,
  withColumn: false,
};

Row.PropTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  withXPadding: PropTypes.bool,
  withYPadding: PropTypes.bool,
  withXMargin: PropTypes.bool,
  withYMargin: PropTypes.bool,
  withColumn: PropTypes.bool,
  style: PropTypes.object,
};

export default Row;
