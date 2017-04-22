import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';
import sample from 'lodash/sample';

import { DEFAULT_FONT, ACCENT } from '../../styles';
import Arrow from '../arrow';

const NOT_FOUND_PHRASES = [
  'No songs for the word :(',
  'No songs found. If you could think of any — you won',
  'I could find nothing. Can you?',
  'Hm... Some "Madonna" song? No, there\'re no songs for the word',
];

export class SongsListContainer extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      // this allows us to render the same phrase and not pick
      // a different one on every rerendering
      notFoundPhrase: sample(NOT_FOUND_PHRASES),
    };
  }

  render() {
    if (!this.props.songs) {
      let label;

      if (this.props.isFetchingSongsList) {
        label = 'Loading...';
      } else {
        label = (
          <div style={{ textAlign: 'center' }} >
            songs
            <Arrow direction="bottom" style={{ display: 'block', margin: '6px auto' }} />
          </div>
        );
      }

      return (
        <div
          style={{
            ...DEFAULT_FONT,
            margin: '24px 0',
            fontSize: '24px',
            textAlign: 'center',
            color: '#777',
            flex: '1 1 auto',
          }}
          onClick={() => this.props.fetchSongsList()}
        >{label}</div>
      );
    } else if (!this.props.songs.length) {
      return (
        <div
          style={{
            ...DEFAULT_FONT,
            fontSize: '24px',
            color: '#777',
            textAlign: 'center',
            flex: '1 1 auto',
          }}
        >{this.state.notFoundPhrase}</div>
      );
    }

    const preloader = <span style={{ color: '#777' }}> — Loading...</span>;
    const tracks = this.props.songs.map(i => (
      <li
        key={i.id}
        style={{
          ...DEFAULT_FONT,
          margin: '16px 0',
          fontSize: '16px',
          lineHeight: '1.2',
        }}
        onClick={() => this.props.fetchLyrics(i)}
      >
        <div style={{ color: ACCENT, marginBottom: '5px' }}>
          {i.name}
          {this.props.lyricsBeingFetched === i.id ? preloader : null}
        </div>
        <div style={{ color: '#777' }}>{i.artist}</div>
      </li>
    ));

    return (
      <div
        style={{
          flex: '1 1 auto',
          overflow: 'auto',
        }}
      >
        <ul
          style={{
            margin: '24px 0',
            padding: '0 10px',
            listStyle: 'none',
          }}
          onScroll={e => e.stopPropagation()}
        >
          {tracks}
        </ul>
      </div>
    );
  }
}

SongsListContainer.defaultProps = {
  lyricsBeingFetched: null,
  showingLyrics: null,
  songs: null,
};

SongsListContainer.propTypes = {
  isFetchingSongsList: PropTypes.bool.isRequired,
  songs: PropTypes.array,
  lyricsBeingFetched: PropTypes.number,
  fetchSongsList: PropTypes.func.isRequired,
  fetchLyrics: PropTypes.func.isRequired,
};

export default Radium(SongsListContainer);
