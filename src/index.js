import fs from 'fs';
import _ from 'lodash';

export default (path1, path2) => {
  const file1 = fs.readFileSync(path1, 'utf8');
  const file2 = fs.readFileSync(path2, 'utf8');
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);
  const keys = [...Object.keys(obj1), ...Object.keys(obj2)]
    .reduce((acc, key) => (acc.includes(key) ? acc : [...acc, key]), []);
  const result = keys.reduce((acc, key) => {
    if (obj1[key] === obj2[key]) {
      return [...acc, `    ${key}: ${obj1[key]}`];
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      return [...acc, `  + ${key}: ${obj2[key]}\n  - ${key}: ${obj1[key]}`];
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return [...acc, `  - ${[key]}: ${obj1[key]}`];
    }
    return [...acc, `  + ${key}: ${obj2[key]}`];
  }, []);
  return `{\n${result.join('\n')}\n}`;
};

