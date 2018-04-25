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

  const calcDiff = (data1, data2) => {
    const keys = _.union(_.keys(data1), _.keys(data2));
    const createAst = (key) => {
      const keyAct = [
        {
          check: item => _.isObject(data1[key]) && _.isObject(data2[item]),
          act: (value1, value2) => ({ type: 'embedded', children: calcDiff(value1, value2) }),
        },
        {
          check: item => data1[key] === data2[item],
          act: value => ({ type: 'unchanged', value }),
        },
        {
          check: item => data1[key] && !data2[item],
          act: value => ({ type: 'deleted', value }),
        },
        {
          check: item => !data1[key] && data2[item],
          act: (noValue, value) => ({ type: 'added', value }),
        },
        {
          check: item => data1[key] !== data2[item],
          act: (oldValue, newValue) => ({ type: 'changed', oldValue, newValue }),
        },
      ];
      return _.find(keyAct, ({ check }) => check(key)).act(data1[key], data2[key]);
    };
    return keys.map(key => ({ key, ...createAst(key) }));
  };

  const render = (ast) => {
    const createString = (data, space = 4) => {
      const stringify = (value) => {
        if (value instanceof Object) {
          const keys = _.keys(value);
          return `{\n${keys.map(k => `${' '.repeat(space + 4)}${k}: ${value[k]}`).join('\n')}\n${' '.repeat(space)}}`;
        }
        return value;
      };
      const objAct = [
        {
          check: obj => obj.type === 'embedded',
          act: obj => `${' '.repeat(space)}${obj.key}: {\n${obj.children.map(el => `${createString(el, space + 4)}`).join('')}${' '.repeat(space)}}\n`,
        },
        {
          check: obj => obj.type === 'unchanged',
          act: obj => `${' '.repeat(space)}${obj.key}: ${stringify(obj.value)}\n`,
        },
        {
          check: obj => obj.type === 'deleted',
          act: obj => `${' '.repeat(space - 2)}- ${obj.key}: ${stringify(obj.value)}\n`,
        },
        {
          check: obj => obj.type === 'added',
          act: obj => `${' '.repeat(space - 2)}+ ${obj.key}: ${stringify(obj.value)}\n`,
        },
        {
          check: obj => obj.type === 'changed',
          act: obj => `${' '.repeat(space - 2)}+ ${obj.key}: ${stringify(obj.newValue)}\n${' '.repeat(space - 2)}- ${obj.key}: ${stringify(obj.oldValue)}\n`,

        },
      ];
      // console.log('!!' + space + '!!');
      return _.find(objAct, ({ check }) => check(data)).act(data);
    };

    const result = ast.map(item => createString(item));
    return result;
  };
  return `{\n${_.flatten(render(calcDiff(obj1, obj2))).join('')}}`;
};
