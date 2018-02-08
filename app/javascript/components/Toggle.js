import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const Toggle = ({
  className,
  toggled,
  onChange,
  id,
  labelA,
  labelB,
  description,
  ...other
}) => {
  const wrapperClasses = classNames({
    'input-holder': true,
    [className]: className,
  });

  return (
    <fieldset className={wrapperClasses}>
      <input
        {...other}
        checked={toggled}
        type="checkbox"
        id={id}
        name={id}
        className="toggle"
        onChange={event => {
          console.log(event);
          onChange(event);
        }}
      />

      {description ? <legend className="toggle__description">{description}</legend> : null}

      <label
        className={classNames({
          toggle__label: true,
          '--checked': toggled,
        })}
        htmlFor={id}
      >
        <span className="toggle__text--left">{labelA}</span>
        <span className="toggle__appearance" />
        <span className="toggle__text--right">{labelB}</span>
      </label>
    </fieldset>
  );
};

Toggle.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  toggled: PropTypes.bool.isRequired,
  labelA: PropTypes.string,
  labelB: PropTypes.string,
  description: PropTypes.string,
};

Toggle.defaultProps = {
  labelA: 'Off',
  labelB: 'On',
  className: '',
  description: null,
};

export default Toggle;