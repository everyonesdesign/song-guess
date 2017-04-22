import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import PropTypes from 'prop-types';

import { mapStateToProps, mapDispatchToProps } from './connector';
import Arrow from '../arrow';
import SongsList from '../songs-list';
import { getWord } from '../../utils';
import { DEFAULT_FONT } from '../../styles';

export class SlideContainer extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      isFetching: false,
      items: null,
      isFetchingLyrics: false,
      showingLyrics: null,
    };
  }

  getWord() {
    return getWord(this.props.words, this.props.index);
  }

  fetchSongsList() {
    if (this.state.isFetching) {
      return;
    }

    this.setState({ isFetching: true });

    const url = `${this.props.fetchSongsUrl}?word=${this.getWord()}`;
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
    if (this.state.isFetchingLyrics) {
      return;
    }

    this.setState({ isFetchingLyrics: song.id });

    const url = `${this.props.fetchLyricsUrl}?id=${song.id}`;
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        const lyrics = data.message.body.lyrics;

        // tracking required by https://developer.musixmatch.com/documentation/api-reference/track-lyrics-get
        const script = document.createElement('script');
        script.src = lyrics.script_tracking_url;
        document.body.appendChild(script);

        this.setState({
          isFetchingLyrics: false,
          showingLyrics: {
            ...song,
            word: this.getWord(),
            lyrics: lyrics.lyrics_body,
            copyright: lyrics.lyrics_copyright,
          },
        });
      });
  }

  render() {
    const word = this.getWord();

    return (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '10px',
          overflow: 'hidden',
          boxSizing: 'border-box',
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
          <Arrow
            direction="left"
            style={{ float: 'left' }}
            onClick={this.props.goToPrevSlide}
          />
          <Arrow
            direction="right"
            style={{ float: 'right' }}
            onClick={this.props.goToNextSlide}
          />
          {word}
        </div>
        <SongsList
          word={word}
          isFetching={this.state.isFetching}
          items={this.state.items}
          showingLyrics={this.state.showingLyrics}
          isFetchingLyrics={this.state.isFetchingLyrics}
          fetchSongsList={() => this.fetchSongsList()}
          fetchLyrics={item => this.fetchLyrics(item)}
        />
      </div>
    );
  }
}

SlideContainer.defaultProps = {
  words: null,
};

SlideContainer.propTypes = {
  words: PropTypes.array,
  index: PropTypes.number.isRequired,
  goToPrevSlide: PropTypes.func.isRequired,
  goToNextSlide: PropTypes.func.isRequired,
  fetchSongsUrl: PropTypes.string.isRequired,
  fetchLyricsUrl: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Radium(SlideContainer));
