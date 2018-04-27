import render from './render';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

const renderers = {
  general: render,
  plain: renderPlain,
  json: renderJson,
};

export default (data, format) => renderers[format](data);
