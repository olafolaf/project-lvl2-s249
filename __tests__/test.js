import fs from 'fs';
import genDiff from '../src';

test('compare json', () => {
  const pathToAfter = '__tests__/__fixtures__/before.json';
  const pathToBefore = '__tests__/__fixtures__/after.json';
  const pathToDifference = '__tests__/__fixtures__/difference';
  const difference = fs.readFileSync(pathToDifference, 'utf8');
  expect(genDiff(pathToAfter, pathToBefore)).toBe(difference);
});
