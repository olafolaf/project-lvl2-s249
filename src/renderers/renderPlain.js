import _ from 'lodash';

const renderPlain = (ast) => {
  // const createValue = value => (_.isObject(value) ? 'complex value' : `value: '${value}'`);
  const objAct = {
    embedded: obj => obj.children.reduce((acc, child) => {
      if (objAct[child.type](child)) {
        const newAcc = [...acc, `Property '${obj.key}.${objAct[child.type](child).slice(10)}`];
        return newAcc;
      }
      return acc;
    }, []).join('\n'),
    unchanged: () => '',
    deleted: obj => `Property '${obj.key}' was removed`,
    added: obj => `Property '${obj.key}' was added with ${(_.isObject(obj.value) ? 'complex value' : `value: '${obj.value}'`)}`,
    changed: obj => `Property '${obj.key}' was updated. From ${(_.isObject(obj.oldValue) ? 'complex value' : `'${obj.oldValue}'`)} to ${(_.isObject(obj.newValue) ? 'complex value' : `'${obj.newValue}'`)}`,
  };
  const result = _.flatten(ast.map(item => objAct[item.type](item))).filter(i => i).join('\n');
  return result;
};
export default renderPlain;
