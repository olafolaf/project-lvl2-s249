import _ from 'lodash';

const render = (ast, ancestry = '') => {
  const createValue = (value, type) => {
    if (_.isObject(value)) {
      return 'complex value';
    }
    return type === 'added' ? `value: '${value}'` : `'${value}'`;
  };
  const objAct = {
    embedded: (obj, name) => render(obj.children, `${name}.`),
    deleted: (obj, name) => `Property '${name}' was removed`,
    added: (obj, name) => `Property '${name}' was added with ${createValue(obj.value, obj.type)}`,
    changed: (obj, name) => `Property '${name}' was updated. From ${createValue(obj.oldValue)} to ${createValue(obj.newValue)}`,
  };
  const filtered = ast.filter(item => item.type !== 'unchanged');
  return _.flatten(filtered.map(item => objAct[item.type](item, ancestry.concat(item.key))));
};

export default ast => render(ast).join('\n');
