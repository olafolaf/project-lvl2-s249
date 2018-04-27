import render from './render';
import renderPlain from './renderPlain';

const renderers = {
  general: render,
  plain: renderPlain,
};

export default (data, format) => renderers[format](data);
