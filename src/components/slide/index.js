import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import PropTypes from 'prop-types';

import { mapStateToProps, mapDispatchToProps } from './connector';
import Arrow from '../arrow';

export const SlideContainer = props => (
  <div
    style={{
      margin: '12px 0',
      padding: '12px 24px',
      fontFamily: 'Catamaran, sans-serif',
      fontWeight: 300,
      fontSize: '36px',
      lineHeight: '40px',
      textAlign: 'center',
    }}
  >
    <Arrow direction="left" style={{ float: 'left' }} />
    <Arrow direction="right" style={{ float: 'right' }} />
    {props.words[props.index % props.words.length]}
  </div>
);

SlideContainer.defaultProps = {
  words: null,
};

SlideContainer.propTypes = {
  words: PropTypes.array,
  index: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Radium(SlideContainer));
