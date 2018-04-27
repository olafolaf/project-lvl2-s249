import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers';
import render from './renderers';

export default (path1, path2, format = 'general') => {
  const ext = path.extname(path1).slice(1);
  const file1 = fs.readFileSync(path1, 'utf8');
  const file2 = fs.readFileSync(path2, 'utf8');
  const obj1 = parse(file1, ext);
  const obj2 = parse(file2, ext);

  const calcDiff = (data1, data2) => {
    const keys = _.union(_.keys(data1), _.keys(data2));
    const createAst = (key) => {
      const keyAct = [
        {
          check: () => _.isObject(data1[key]) && _.isObject(data2[key]),
          act: (value1, value2) => ({ type: 'embedded', children: calcDiff(value1, value2) }),
        },
        {
          check: () => data1[key] === data2[key],
          act: value => ({ type: 'unchanged', value }),
        },
        {
          check: () => data1[key] && !data2[key],
          act: value => ({ type: 'deleted', value }),
        },
        {
          check: () => !data1[key] && data2[key],
          act: (noValue, value) => ({ type: 'added', value }),
        },
        {
          check: () => data1[key] !== data2[key],
          act: (oldValue, newValue) => ({ type: 'changed', oldValue, newValue }),
        },
      ];
      return _.find(keyAct, ({ check }) => check()).act(data1[key], data2[key]);
    };
    return keys.map(key => ({ key, ...createAst(key) }));
  };

  const diff = calcDiff(obj1, obj2);
  return render(diff, format);
};

