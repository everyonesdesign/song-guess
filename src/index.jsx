import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

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
    words: TEST_WORDS,
  },
);

ReactDOM.render(
  <Provider store={store}>
    <div>Hello, guess the song!</div>
  </Provider>,
  document.getElementById('container'),
);
