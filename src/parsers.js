import { parse } from 'ini';
import { safeLoad } from 'js-yaml';

const parser = {
  json: JSON.parse,
  yaml: safeLoad,
  ini: parse,
};

export default (data, format) => parser[format](data);
