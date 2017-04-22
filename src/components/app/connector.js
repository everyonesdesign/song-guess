export const mapStateToProps = state => ({
  isReady: !!(state.words && state.config),
});

export const mapDispatchToProps = () => ({});
