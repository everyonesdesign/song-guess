export const mapStateToProps = state => ({
  words: state.words,
  fetchSongsUrl: state.config.fetchSongsUrl,
  fetchLyricsUrl: state.config.fetchLyricsUrl,
});

export const mapDispatchToProps = () => ({});
