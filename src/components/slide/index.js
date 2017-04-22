import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import PropTypes from 'prop-types';

import { mapStateToProps, mapDispatchToProps } from './connector';
import Arrow from '../arrow';
import SongsList from '../songs-list';
import { getWord } from '../../utils';
import { DEFAULT_FONT } from '../../styles';

export const SlideContainer = (props) => {
  const word = getWord(props.words, props.index);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '10px',
      }}
    >
      <div
        style={{
          ...DEFAULT_FONT,
          margin: '24px 0',
          fontSize: '36px',
          lineHeight: '40px',
          textAlign: 'center',
        }}
      >
        <Arrow direction="left" style={{ float: 'left' }} />
        <Arrow direction="right" style={{ float: 'right' }} />
        {word}
      </div>
      <SongsList word={word} />
    </div>
  );
};

SlideContainer.defaultProps = {
  words: null,
};

SlideContainer.propTypes = {
  words: PropTypes.array,
  index: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Radium(SlideContainer));
