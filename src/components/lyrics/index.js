import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT_FONT } from '../../styles';

function getHighlightedLyrics(lyrics, word) {
  const regex = new RegExp(`\\b${word}\\b`);
  return lyrics.replace(regex, '<strong>$&</strong>');
}

/* eslint-disable react/no-danger */
export const LyricsContainer = props => (
  <div
    style={{
      ...DEFAULT_FONT,
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: '20px',
      background: 'white',
      textAlign: 'center',
      overflow: 'auto',
    }}
  >
    <div style={{ fontSize: '24px', margin: '4px 0 24px' }}>
      {props.name}
    </div>
    <div style={{ fontSize: '14px', margin: '-18px 0 22px', color: '#777' }}>
      {props.artist}
    </div>
    <div style={{ whiteSpace: 'pre-wrap', margin: '22px 0', lineHeight: 1.5, textAlign: 'left' }}>
      <div dangerouslySetInnerHTML={{ __html: getHighlightedLyrics(props.lyrics, props.word) }} />
    </div>
  </div>
);

LyricsContainer.propTypes = {
  word: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  lyrics: PropTypes.string.isRequired,
};

export default LyricsContainer;
