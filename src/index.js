import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import shuffle from 'lodash/shuffle';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';

import Slide from './slide';
import { LIGHT_ACCENT } from './styles';

const TEST_WORDS = [
  'billie',
  'jean',
  'is',
  'not',
  'my',
  'lover',
];

const store = createStore(
  state => state,
  {
    words: shuffle(TEST_WORDS),
  },
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const VirtualizeSwipeableViews = virtualize(SwipeableViews);
// eslint-disable-next-line react/prop-types
const slideRenderer = ({ key, index }) => (
  <Slide key={key} index={index} />
);

ReactDOM.render(
  <Provider store={store}>
    <div
      style={{
        paddingTop: '18px',
        borderTop: `6px solid ${LIGHT_ACCENT}`,
      }}
    >
      <VirtualizeSwipeableViews slideRenderer={slideRenderer} />
    </div>
  </Provider>,
  document.getElementById('container'),
);
