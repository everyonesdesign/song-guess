import test from 'ava';
import { getWord } from '../src/utils';

const words = ['foo', 'bar'];

test('getWord can find a word by positive index', (t) => {
  const result = getWord(words, 1);
  t.is(result, 'bar');
});

test('getWord can find a word by big positive index', (t) => {
  const result = getWord(words, 3);
  t.is(result, 'bar');
});

test('getWord can find a word by negative index', (t) => {
  const result = getWord(words, -1);
  t.is(result, 'bar');
});

test('getWord can find a word by average index', (t) => {
  const result = getWord(words, -2);
  t.is(result, 'foo');
});

test('getWord can find a word by big negative index', (t) => {
  const result = getWord(words, -3);
  t.is(result, 'bar');
});
