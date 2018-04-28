import _ from 'lodash';

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

  return _.flatten(ast.map(item => objAct[item.type](item)));
};

export default data => `{\n${render(data).join('')}}`;

