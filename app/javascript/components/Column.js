import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

// TODO: rename to Cell?
const Column = (props) => {
  const { children, widthSmall, className, offset, offsetMedium, offsetLarge } = props; // eslint-disable-line
  let widthMedium = props.widthMedium;
  let widthLarge = props.widthLarge;

  if (props.widthMediumUp) {
    widthMedium = props.widthMediumUp;
    widthLarge = props.widthMediumUp;
  }

  const classes = Classnames({
    cell: true,

    [`small-${widthSmall}`]: (widthSmall),
    [`medium-${widthMedium}`]: (widthMedium),
    [`large-${widthLarge}`]: (widthLarge),

    [`small-offset-${offset}`]: (offset || offset === 0),
    [`medium-offset-${offsetMedium}`]: (offsetMedium || offsetMedium === 0),
    [`large-offset-${offsetLarge}`]: (offsetLarge || offsetLarge === 0),

    [`auto`]: (props.isAuto),
    [`medium-auto`]: (props.isAutoMediumUp),

    [`${props.className}`]: (className), // add any classes passed down
  });

  return (
    <div className={classes} style={props.style}>
      {children}
    </div>
  );
}

Column.defaultProps = {
  widthSmall: 12,
  widthMedium: 10,
  isAuto: false,
};

Column.PropTypes = {
  children: PropTypes.node,
  widthSmall: PropTypes.number,
  widthMedium: PropTypes.number,
  widthLarge: PropTypes.number,
  widthMediumUp: PropTypes.number,
  offset: PropTypes.number,
  offsetMedium: PropTypes.number,
  offsetLarge: PropTypes.number,
  isAuto: PropTypes.bool,
  isAutoMediumUp: PropTypes.bool,
  style: PropTypes.object,
};

export default Column;