import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT_FONT } from '../../styles';

function getHighlightedLyrics(lyrics, word) {
  const regex = new RegExp(`\\b${word}\\b`);
  return lyrics.replace(regex, '<strong>$&</strong>');
}

/* eslint-disable react/no-danger */
export const LyricsContainer = (props) => {
  let lyrics;

  if (props.lyrics) {
    // eslint-disable-next-line no-underscore-dangle
    const __html = getHighlightedLyrics(props.lyrics, props.word);
    lyrics = <div dangerouslySetInnerHTML={{ __html }} />;
  } else {
    lyrics = 'Unfortunately, no lyrics found for the song';
  }

  return (
    <div
      style={{
        ...DEFAULT_FONT,
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
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
      <div onClick={props.onClose}>
        <div
          style={{
            height: '60px',
            lineHeight: '60px',
            fontSize: '24px',
            color: '#777',
          }}
        >go back</div>
        <div style={{ fontSize: '24px', margin: '4px 0 24px' }}>
          {props.name}
        </div>
        <div style={{ fontSize: '14px', margin: '-18px 0 22px', color: '#777' }}>
          {props.artist}
        </div>
      </div>
      <div
        style={{
          flex: '1 1 auto',
          whiteSpace: 'pre-wrap',
          margin: '22px 0',
          lineHeight: 1.5,
          textAlign: 'left',
          overflow: 'auto',
        }}
      >{lyrics}</div>
    </div>
  );
};

LyricsContainer.defaultProps = {
  lyrics: null,
};

LyricsContainer.propTypes = {
  word: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  lyrics: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default LyricsContainer;
