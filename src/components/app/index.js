import React from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import PropTypes from 'prop-types';

import Slide from '../slide';
import { DEFAULT_FONT, LIGHT_ACCENT } from '../../styles';
import { mapStateToProps, mapDispatchToProps } from './connector';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

export class AppContainer extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      slideIndex: 0,
    };
  }

  render() {
    let contents;
    if (this.props.isReady) {
      // eslint-disable-next-line react/prop-types
      const slideRenderer = ({ key, index }) => (
        <Slide
          key={key}
          index={index}
          goToPrevSlide={() => this.setState({ slideIndex: this.state.slideIndex - 1 })}
          goToNextSlide={() => this.setState({ slideIndex: this.state.slideIndex + 1 })}
        />
      );

      contents = (
        <VirtualizeSwipeableViews
          index={this.state.slideIndex}
          slideRenderer={slideRenderer}
          onChangeIndex={i => this.setState({ slideIndex: i })}
        />
      );
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
  }
}


AppContainer.propTypes = {
  isReady: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
