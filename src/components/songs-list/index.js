import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import PropTypes from 'prop-types';
import sample from 'lodash/sample';

import { mapStateToProps, mapDispatchToProps } from './connector';
import { DEFAULT_FONT, ACCENT } from '../../styles';
import Lyrics from '../lyrics';

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
      isFetching: false,
      items: null,
      showingLyrics: null,

      // this allows us to render the same phrase and not pick
      // a different one on every rerendering
      notFoundPhrase: sample(NOT_FOUND_PHRASES),
    };
  }

  fetchSongsList() {
    this.setState({ isFetching: true });

    const url = `${this.props.fetchSongsUrl}?word=${this.props.word}`;
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          isFetching: false,
          items: data.message.body.track_list.map(t => ({
            id: t.track.track_id,
            artist: t.track.artist_name,
            name: t.track.track_name,
            album: t.track.album_name,
          })),
        });
      });
  }

  fetchLyrics(song) {
    const url = `${this.props.fetchLyricsUrl}?id=${song.id}`;
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        const lyrics = data.message.body.lyrics;

        this.setState({
          showingLyrics: {
            ...song,
            word: this.props.word,
            lyrics: lyrics.lyrics_body,
            copyright: lyrics.lyrics_copyright,
          },
        });
      });
  }

  render() {
    if (!this.state.items) {
      return (
        <div
          style={{
            ...DEFAULT_FONT,
            margin: '24px 0',
            fontSize: '24px',
            textAlign: 'center',
            color: this.state.isFetching ? '#777' : ACCENT,
          }}
          onClick={() => (this.state.isFetching ? null : this.fetchSongsList())}
        >
          {this.state.isFetching ? 'Loading...' : 'Show songs'}
        </div>
      );
    } else if (!this.state.items.length) {
      return (
        <div
          style={{
            ...DEFAULT_FONT,
            fontSize: '24px',
            color: '#777',
            textAlign: 'center',
          }}
        >{this.state.notFoundPhrase}</div>
      );
    }

    const tracks = this.state.items.map(i => (
      <li
        key={i.id}
        style={{
          ...DEFAULT_FONT,
          margin: '16px 0',
          fontSize: '16px',
          lineHeight: '1.2',
        }}
        onClick={() => this.fetchLyrics(i)}
      >
        <div style={{ color: ACCENT, marginBottom: '5px' }}>{i.name}</div>
        <div style={{ color: '#777' }}>{i.artist}</div>
      </li>
    ));

    const lyrics = this.state.showingLyrics ? (
      <Lyrics
        {...this.state.showingLyrics}
        onClose={() => this.setState({ showingLyrics: null })}
      />
    ) : null;

    return (
      <div>
        {lyrics}
        <ul
          style={{
            margin: '24px 0',
            padding: '0 10px',
            listStyle: 'none',
            flex: '1 1 auto',
            overflow: 'auto',
          }}
          onScroll={e => e.stopPropagation()}
        >
          {tracks}
        </ul>
      </div>
    );
  }
}

SongsListContainer.propTypes = {
  word: PropTypes.string.isRequired,
  fetchSongsUrl: PropTypes.string.isRequired,
  fetchLyricsUrl: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Radium(SongsListContainer));
