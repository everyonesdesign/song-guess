import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import PropTypes from 'prop-types';

import { mapStateToProps, mapDispatchToProps } from './connector';

export class SlideContainer extends React.PureComponent {
  getStyles() {}

  render() {
    const { list, step, start } = this.props.words;
    const index = start + (step * this.props.index);

    return (
      <div>{list[index]}</div>
    );
  }
}

SlideContainer.defaultProps = {
  words: null,
};

SlideContainer.propTypes = {
  words: PropTypes.shape({
    list: PropTypes.array,
    step: PropTypes.number,
    start: PropTypes.number,
  }),
  index: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Radium(SlideContainer));
