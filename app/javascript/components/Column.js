import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

const Column = (props) => {
  const { children, widthSmall, widthMedium, widthLarge, className, isCentered } = props; // eslint-disable-line
  const classes = Classnames({
    columns: true,

    [`small-${widthSmall}`]: (widthSmall),
    [`medium-${widthMedium}`]: (widthMedium),
    [`large-${widthLarge}`]: (widthLarge),

    'small-centered': isCentered,

    [`${props.className}`]: (className), // add any classes passed down
  });

  return (
    <div className={classes}>
      {children}
    </div>
  );
}

Column.defaultProps = {
  children: null,
  widthSmall: 12,
  widthMedium: 8,
  widthLarge: null,
  isCentered: true,
  className: null,
};

Column.PropTypes = {
  children: PropTypes.node,
  widthSmall: PropTypes.number,
  widthMedium: PropTypes.number,
  widthLarge: PropTypes.number,
  isCentered: PropTypes.bool,
};

export default Column;