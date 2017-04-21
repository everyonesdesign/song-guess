import { CONFIG_LOADED } from '../actions';

export default function words(state = null, action) {
  if (action.type === CONFIG_LOADED) {
    return action.data;
  }

  return state;
}
