import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

const Arrow = (props) => {
  let transform;

  const style = {
    base: {
      textAlign: 'center',
      display: 'inline-block',
      width: '32px',
      height: '32px',
      transform,
      ...props.style,
    },
    top: {
      transform: 'rotate(0deg)',
    },
    right: {
      transform: 'rotate(90deg)',
    },
    bottom: {
      transform: 'rotate(180deg)',
    },
    left: {
      transform: 'rotate(270deg)',
    },
  };

  return (
    <div
      style={[style.base, style[props.direction]]}
      onClick={props.onClick ? props.onClick : null}
    >
      <svg width="6" height="31" viewBox="0 0 6 31" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 4v27h2V4H2zM0 4h6L3 0 0 4z" fill="#aaa" fillRule="evenodd" />
      </svg>
    </div>
  );
};

Arrow.defaultProps = {
  style: {},
  onClick: null,
};

Arrow.propTypes = {
  direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default Radium(Arrow);
