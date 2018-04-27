import fs from 'fs';
import genDiff from '../src';

test('compare json', () => {
  const pathToBefore = '__tests__/__fixtures__/before.json';
  const pathToAfter = '__tests__/__fixtures__/after.json';
  const pathToDifference = '__tests__/__fixtures__/difference';
  const difference = fs.readFileSync(pathToDifference, 'utf8');
  expect(genDiff(pathToBefore, pathToAfter)).toBe(difference);
});

test('compare yaml', () => {
  const pathToBefore = '__tests__/__fixtures__/before.yaml';
  const pathToAfter = '__tests__/__fixtures__/after.yaml';
  const pathToDifference = '__tests__/__fixtures__/difference';
  const difference = fs.readFileSync(pathToDifference, 'utf8');
  expect(genDiff(pathToBefore, pathToAfter)).toBe(difference);
});

test('compare ini', () => {
  const pathToBefore = '__tests__/__fixtures__/before.ini';
  const pathToAfter = '__tests__/__fixtures__/after.ini';
  const pathToDifference = '__tests__/__fixtures__/difference';
  const difference = fs.readFileSync(pathToDifference, 'utf8');
  expect(genDiff(pathToBefore, pathToAfter)).toBe(difference);
});

test('compare json2', () => {
  const pathToBefore = '__tests__/__fixtures__/before2.json';
  const pathToAfter = '__tests__/__fixtures__/after2.json';
  const pathToDifference = '__tests__/__fixtures__/difference2';
  const difference = fs.readFileSync(pathToDifference, 'utf8');
  expect(genDiff(pathToBefore, pathToAfter)).toBe(difference);
});

test('compare ini2', () => {
  const pathToBefore = '__tests__/__fixtures__/before2.ini';
  const pathToAfter = '__tests__/__fixtures__/after2.ini';
  const pathToDifference = '__tests__/__fixtures__/difference2';
  const difference = fs.readFileSync(pathToDifference, 'utf8');
  expect(genDiff(pathToBefore, pathToAfter)).toBe(difference);
});

test('compare yaml2', () => {
  const pathToBefore = '__tests__/__fixtures__/before2.yaml';
  const pathToAfter = '__tests__/__fixtures__/after2.yaml';
  const pathToDifference = '__tests__/__fixtures__/difference2';
  const difference = fs.readFileSync(pathToDifference, 'utf8');
  expect(genDiff(pathToBefore, pathToAfter)).toBe(difference);
});

test('compare json plain', () => {
  const pathToBefore = '__tests__/__fixtures__/before.json';
  const pathToAfter = '__tests__/__fixtures__/after.json';
  const pathToDifference = '__tests__/__fixtures__/difference1_plain';
  const difference = fs.readFileSync(pathToDifference, 'utf8');
  expect(genDiff(pathToBefore, pathToAfter, 'plain')).toBe(difference);
});

test('compare json2 plain', () => {
  const pathToBefore = '__tests__/__fixtures__/before2.json';
  const pathToAfter = '__tests__/__fixtures__/after2.json';
  const pathToDifference = '__tests__/__fixtures__/difference2_plain';
  const difference = fs.readFileSync(pathToDifference, 'utf8');
  expect(genDiff(pathToBefore, pathToAfter, 'plain')).toBe(difference);
});
