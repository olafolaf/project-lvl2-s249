import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers';

export default (path1, path2) => {
  const format = path.extname(path1).slice(1);
  const file1 = fs.readFileSync(path1, 'utf8');
  const file2 = fs.readFileSync(path2, 'utf8');
  const obj1 = parse(file1, format);
  const obj2 = parse(file2, format);

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

  const render = (ast, space = 4) => {
    const stringify = (value) => {
      if (value instanceof Object) {
        const keys = _.keys(value);
        return `{\n${keys.map(k => `${' '.repeat(space + 4)}${k}: ${value[k]}`).join('\n')}\n${' '.repeat(space)}}`;
      }
      return value;
    };
    const createString = (key, value, newSpace, sign = '') =>
      `${' '.repeat(newSpace)}${sign}${key}: ${stringify(value)}\n`;

    const objAct = {
      embedded: obj => `${' '.repeat(space)}${obj.key}: {\n${render(obj.children, space + 4).join('')}${' '.repeat(space)}}\n`,
      unchanged: obj => createString(obj.key, obj.value, space),
      deleted: obj => createString(obj.key, obj.value, space - 2, '- '),
      added: obj => createString(obj.key, obj.value, space - 2, '+ '),
      changed: obj => [createString(obj.key, obj.newValue, space - 2, '+ '), createString(obj.key, obj.oldValue, space - 2, '- ')],
    };
      // console.log('!!' + space + '!!');
    return _.flatten(ast.map(item => objAct[item.type](item)));
  };
  return `{\n${render(calcDiff(obj1, obj2)).join('')}}`;
};
