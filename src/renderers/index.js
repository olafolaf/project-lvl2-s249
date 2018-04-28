import renderGeneral from './renderGeneral';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

const renderers = {
  general: renderGeneral,
  plain: renderPlain,
  json: renderJson,
};

export default (data, format) => renderers[format](data);
