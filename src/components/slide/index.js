import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import PropTypes from 'prop-types';
import Swipeable from 'react-swipeable';

import { mapStateToProps, mapDispatchToProps } from './connector';
import Arrow from '../arrow';
import Lyrics from '../lyrics';
import SongsList from '../songs-list';
import { getWord } from '../../utils';
import { DEFAULT_FONT } from '../../styles';

export class SlideContainer extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      songs: null,
      showingLyrics: null,
      isFetchingSongsList: false,
      lyricsBeingFetched: null,
    };
  }

  getWord() {
    return getWord(this.props.words, this.props.index);
  }

  fetchSongsList() {
    if (this.state.isFetchingSongsList) {
      return;
    }

    this.setState({ isFetchingSongsList: true });

    const url = `${this.props.fetchSongsUrl}?word=${this.getWord()}`;
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          isFetchingSongsList: false,
          songs: data.message.body.track_list.map(t => ({
            id: t.track.track_id,
            artist: t.track.artist_name,
            name: t.track.track_name,
            album: t.track.album_name,
          })),
        });
      });
  }

  fetchLyrics(song) {
    if (this.state.lyricsBeingFetched) {
      return;
    }

    this.setState({ lyricsBeingFetched: song.id });

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
          lyricsBeingFetched: null,
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

    const copyright = (
      <div
        style={{
          ...DEFAULT_FONT,
          margin: '24px 0 12px',
          fontSize: '14px',
          textAlign: 'center',
          color: '#777',
        }}
      >
        <a
          href="https://www.musixmatch.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          Powered by musixmatch
        </a>
      </div>
    );

    const lyrics = this.state.showingLyrics ? (
      <Lyrics
        {...this.state.showingLyrics}
        onClose={() => this.setState({ showingLyrics: null })}
      />
    ) : null;

    const slideContents = (
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
          isFetchingSongsList={this.state.isFetchingSongsList}
          songs={this.state.songs}
          showingLyrics={this.state.showingLyrics}
          lyricsBeingFetched={this.state.lyricsBeingFetched}
          fetchSongsList={() => this.fetchSongsList()}
          fetchLyrics={item => this.fetchLyrics(item)}
        />
        {lyrics}
        {copyright}
      </div>
    );

    if (!this.state.songs) {
      return (
        <Swipeable onSwipedUp={() => this.fetchSongsList()} delta={150}>
          {slideContents}
        </Swipeable>
      );
    }

    return slideContents;
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
