import React from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import PropTypes from 'prop-types';

import Slide from '../slide';
import { DEFAULT_FONT, LIGHT_ACCENT } from '../../styles';
import { mapStateToProps, mapDispatchToProps } from './connector';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);
// eslint-disable-next-line react/prop-types
const slideRenderer = ({ key, index }) => (
  <Slide key={key} index={index} />
);

export const AppContainer = (props) => {
  let contents;
  if (props.words && props.config) {
    contents = <VirtualizeSwipeableViews slideRenderer={slideRenderer} />;
  } else {
    contents = (
      <div
        style={{
          ...DEFAULT_FONT,
          margin: '14px 0',
          color: '#777',
          fontSize: '24px',
          textAlign: 'center',
        }}
      >Starting the app...</div>
    );
  }

  return (
    <div
      style={{
        paddingTop: '18px',
        borderTop: `6px solid ${LIGHT_ACCENT}`,
        boxSizing: 'border-box',
      }}
    >{contents}</div>
  );
};

AppContainer.defaultProps = {
  words: null,
  config: null,
};

AppContainer.propTypes = {
  words: PropTypes.array,
  config: PropTypes.shape({
    musixmatch_key: PropTypes.string.required,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
