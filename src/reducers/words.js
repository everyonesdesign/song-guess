import { DICTIONARY_LOADED } from '../actions';

export default function words(state = null, action) {
  if (action.type === DICTIONARY_LOADED) {
    return action.data;
  }

  return state;
}
