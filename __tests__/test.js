import fs from 'fs';
import genDiff from '../src';

const formats = ['json', 'yaml', 'ini'];

formats.forEach(format =>
  test(`check ${format}`, () => {
    const pathToBefore = `__tests__/__fixtures__/before.${format}`;
    const pathToAfter = `__tests__/__fixtures__/after.${format}`;
    const pathToDifference = '__tests__/__fixtures__/difference';
    const pathToDifferencePlain = '__tests__/__fixtures__/difference_plain';
    const pathToDifferenceJson = '__tests__/__fixtures__/difference_json';
    const difference = fs.readFileSync(pathToDifference, 'utf8');
    const differencePlain = fs.readFileSync(pathToDifferencePlain, 'utf8');
    const differenceJson = fs.readFileSync(pathToDifferenceJson, 'utf8');
    expect(genDiff(pathToBefore, pathToAfter)).toBe(difference);
    expect(genDiff(pathToBefore, pathToAfter, 'plain')).toBe(differencePlain);
    expect(genDiff(pathToBefore, pathToAfter, 'json')).toBe(differenceJson);
  }));

formats.forEach(format =>
  test(`check ${format} tree`, () => {
    const pathToBefore = `__tests__/__fixtures__/before2.${format}`;
    const pathToAfter = `__tests__/__fixtures__/after2.${format}`;
    const pathToDifference = '__tests__/__fixtures__/difference2';
    const pathToDifferencePlain = '__tests__/__fixtures__/difference2_plain';
    const pathToDifferenceJson = '__tests__/__fixtures__/difference2_json';
    const difference = fs.readFileSync(pathToDifference, 'utf8');
    const differencePlain = fs.readFileSync(pathToDifferencePlain, 'utf8');
    const differenceJson = fs.readFileSync(pathToDifferenceJson, 'utf8');
    expect(genDiff(pathToBefore, pathToAfter)).toBe(difference);
    expect(genDiff(pathToBefore, pathToAfter, 'plain')).toBe(differencePlain);
    expect(genDiff(pathToBefore, pathToAfter, 'json')).toBe(differenceJson);
  }));

