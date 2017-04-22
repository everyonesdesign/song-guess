import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import shuffle from 'lodash/shuffle';

import wordsReducer from './reducers/words';
import configReducer from './reducers/config';
import {
  CONFIG_LOADED,
  DICTIONARY_LOADED,
} from './actions';
import App from './components/app';

const store = createStore(
  combineReducers({
    words: wordsReducer,
    config: configReducer,
  }),
  {},
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// fetch app config
fetch('config.json')
  .then(response => response.json())
  .then(data => (
    store.dispatch({
      data,
      type: CONFIG_LOADED,
    })
  ),
);

// fetch dictionary
fetch('dict/index.json')
  .then(response => response.json())
  .then(words => (
    store.dispatch({
      data: shuffle(words),
      type: DICTIONARY_LOADED,
    })
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container'),
);
