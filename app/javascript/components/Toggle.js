import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const Toggle = ({
  className,
  defaultToggled,
  toggled,
  onToggle,
  id,
  labelA,
  labelB,
  ...other
}) => {
  let inputNode;
  const wrapperClasses = classNames({
    'input-holder': true,
    [className]: className,
  });

  const checkedProps = {};

  if (typeof toggled !== 'undefined') {
    checkedProps.checked = toggled;
  } else {
    checkedProps.defaultChecked = defaultToggled;
  }

  return (
    <div className={wrapperClasses}>
      <input
        {...other}
        {...checkedProps}
        type="checkbox"
        id={id}
        className="toggle"
        onChange={event => {
          onToggle(inputNode.checked, id, event);
        }}
        ref={el => {
          inputNode = el;
        }}
      />

      <label className="toggle__label" htmlFor={id}>
        <span className="toggle__text--left">{labelA}</span>
        <span className="toggle__appearance" />
        <span className="toggle__text--right">{labelB}</span>
      </label>
    </div>
  );
};

Toggle.propTypes = {
  className: PropTypes.string,
  defaultToggled: PropTypes.bool,
  onToggle: PropTypes.func,
  id: PropTypes.string.isRequired,
  toggled: PropTypes.bool,
  labelA: PropTypes.string,
  labelB: PropTypes.string,
};

Toggle.defaultProps = {
  defaultToggled: false,
  labelA: 'Off',
  labelB: 'On',
  className: '',
  onToggle: () => {},
};

export default Toggle;