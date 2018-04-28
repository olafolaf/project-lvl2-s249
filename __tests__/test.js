import fs from 'fs';
import genDiff from '../src';

test('compare json', () => {
  const pathToBefore = '__tests__/__fixtures__/before.json';
  const pathToAfter = '__tests__/__fixtures__/after.json';
  const pathToDifference = '__tests__/__fixtures__/difference';
  const pathToDifferencePlain = '__tests__/__fixtures__/difference_plain';
  const pathToDifferenceJson = '__tests__/__fixtures__/difference_json';
  const difference = fs.readFileSync(pathToDifference, 'utf8');
  const differencePlain = fs.readFileSync(pathToDifferencePlain, 'utf8');
  const differenceJson = fs.readFileSync(pathToDifferenceJson, 'utf8');
  expect(genDiff(pathToBefore, pathToAfter)).toBe(difference);
  expect(genDiff(pathToBefore, pathToAfter, 'plain')).toBe(differencePlain);
  expect(genDiff(pathToBefore, pathToAfter, 'json')).toBe(differenceJson);
});

test('compare yaml', () => {
  const pathToBefore = '__tests__/__fixtures__/before.yaml';
  const pathToAfter = '__tests__/__fixtures__/after.yaml';
  const pathToDifference = '__tests__/__fixtures__/difference';
  const pathToDifferencePlain = '__tests__/__fixtures__/difference_plain';
  const pathToDifferenceJson = '__tests__/__fixtures__/difference_json';
  const difference = fs.readFileSync(pathToDifference, 'utf8');
  const differencePlain = fs.readFileSync(pathToDifferencePlain, 'utf8');
  const differenceJson = fs.readFileSync(pathToDifferenceJson, 'utf8');
  expect(genDiff(pathToBefore, pathToAfter)).toBe(difference);
  expect(genDiff(pathToBefore, pathToAfter, 'plain')).toBe(differencePlain);
  expect(genDiff(pathToBefore, pathToAfter, 'json')).toBe(differenceJson);
});

test('compare ini', () => {
  const pathToBefore = '__tests__/__fixtures__/before.ini';
  const pathToAfter = '__tests__/__fixtures__/after.ini';
  const pathToDifference = '__tests__/__fixtures__/difference';
  const pathToDifferencePlain = '__tests__/__fixtures__/difference_plain';
  const pathToDifferenceJson = '__tests__/__fixtures__/difference_json';
  const difference = fs.readFileSync(pathToDifference, 'utf8');
  const differencePlain = fs.readFileSync(pathToDifferencePlain, 'utf8');
  const differenceJson = fs.readFileSync(pathToDifferenceJson, 'utf8');
  expect(genDiff(pathToBefore, pathToAfter)).toBe(difference);
  expect(genDiff(pathToBefore, pathToAfter, 'plain')).toBe(differencePlain);
  expect(genDiff(pathToBefore, pathToAfter, 'json')).toBe(differenceJson);
});

test('compare json2', () => {
  const pathToBefore = '__tests__/__fixtures__/before2.json';
  const pathToAfter = '__tests__/__fixtures__/after2.json';
  const pathToDifference = '__tests__/__fixtures__/difference2';
  const pathToDifferencePlain = '__tests__/__fixtures__/difference2_plain';
  const pathToDifferenceJson = '__tests__/__fixtures__/difference2_json';
  const difference = fs.readFileSync(pathToDifference, 'utf8');
  const differencePlain = fs.readFileSync(pathToDifferencePlain, 'utf8');
  const differenceJson = fs.readFileSync(pathToDifferenceJson, 'utf8');
  expect(genDiff(pathToBefore, pathToAfter)).toBe(difference);
  expect(genDiff(pathToBefore, pathToAfter, 'plain')).toBe(differencePlain);
  expect(genDiff(pathToBefore, pathToAfter, 'json')).toBe(differenceJson);
});

test('compare ini2', () => {
  const pathToBefore = '__tests__/__fixtures__/before2.ini';
  const pathToAfter = '__tests__/__fixtures__/after2.ini';
  const pathToDifference = '__tests__/__fixtures__/difference2';
  const pathToDifferencePlain = '__tests__/__fixtures__/difference2_plain';
  const pathToDifferenceJson = '__tests__/__fixtures__/difference2_json';
  const difference = fs.readFileSync(pathToDifference, 'utf8');
  const differencePlain = fs.readFileSync(pathToDifferencePlain, 'utf8');
  const differenceJson = fs.readFileSync(pathToDifferenceJson, 'utf8');
  expect(genDiff(pathToBefore, pathToAfter)).toBe(difference);
  expect(genDiff(pathToBefore, pathToAfter, 'plain')).toBe(differencePlain);
  expect(genDiff(pathToBefore, pathToAfter, 'json')).toBe(differenceJson);
});

test('compare yaml2', () => {
  const pathToBefore = '__tests__/__fixtures__/before2.yaml';
  const pathToAfter = '__tests__/__fixtures__/after2.yaml';
  const pathToDifference = '__tests__/__fixtures__/difference2';
  const pathToDifferencePlain = '__tests__/__fixtures__/difference2_plain';
  const pathToDifferenceJson = '__tests__/__fixtures__/difference2_json';
  const difference = fs.readFileSync(pathToDifference, 'utf8');
  const differencePlain = fs.readFileSync(pathToDifferencePlain, 'utf8');
  const differenceJson = fs.readFileSync(pathToDifferenceJson, 'utf8');
  expect(genDiff(pathToBefore, pathToAfter)).toBe(difference);
  expect(genDiff(pathToBefore, pathToAfter, 'plain')).toBe(differencePlain);
  expect(genDiff(pathToBefore, pathToAfter, 'json')).toBe(differenceJson);
});

test('compare json2 plain', () => {
  const pathToBefore = '__tests__/__fixtures__/before2.json';
  const pathToAfter = '__tests__/__fixtures__/after2.json';
  const pathToDifference = '__tests__/__fixtures__/difference2_plain';
  const pathToDifferencePlain = '__tests__/__fixtures__/difference2_plain';
  const pathToDifferenceJson = '__tests__/__fixtures__/difference2_json';
  const difference = fs.readFileSync(pathToDifference, 'utf8');
  const differencePlain = fs.readFileSync(pathToDifferencePlain, 'utf8');
  const differenceJson = fs.readFileSync(pathToDifferenceJson, 'utf8');
  expect(genDiff(pathToBefore, pathToAfter, 'plain')).toBe(difference);
  expect(genDiff(pathToBefore, pathToAfter, 'plain')).toBe(differencePlain);
  expect(genDiff(pathToBefore, pathToAfter, 'json')).toBe(differenceJson);
});
