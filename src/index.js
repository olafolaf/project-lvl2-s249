import fs from 'fs';
import _ from 'lodash';
import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';

export default (path1, path2) => {
  const selectParser = {
    json: JSON.parse,
    yaml: yaml.safeLoad,
    ini: ini.parse,
  };
  const parse = selectParser[path.extname(path1).slice(1)];
  const file1 = fs.readFileSync(path1, 'utf8');
  const file2 = fs.readFileSync(path2, 'utf8');
  const obj1 = parse(file1);
  const obj2 = parse(file2);
  const keys = _.union(_.keys(obj1), _.keys(obj2));

  const result = keys.reduce((acc, key) => {
    if (obj1[key] === obj2[key]) {
      return [...acc, `    ${key}: ${obj1[key]}`];
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      return [...acc, `  + ${key}: ${obj2[key]}`, `  - ${key}: ${obj1[key]}`];
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return [...acc, `  - ${[key]}: ${obj1[key]}`];
    }
    return [...acc, `  + ${key}: ${obj2[key]}`];
  }, []);
  return `{\n${result.join('\n')}\n}`;
};
