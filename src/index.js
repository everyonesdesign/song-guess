import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Slide from './slide';

const TEST_WORDS = [
  'billie',
  'jean',
  'is',
  'not',
  'my',
  'lover',
];

const getStart = length => Math.floor(Math.random() * length);
const store = createStore(
  state => state,
  {
    words: {
      list: TEST_WORDS,
      step: 5,
      start: getStart(TEST_WORDS.length),
    },
  },
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <Provider store={store}>
    <Slide index={0} />
  </Provider>,
  document.getElementById('container'),
);
