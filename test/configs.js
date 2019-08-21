global.XMLHttpRequest = require('xhr2');
const clone = require('clone');

const seeAjax = require('../lib/cjs');
const { port, response } = require('./share');

seeAjax.config('common', {
  responseRefactor: [{ message: 'msg' }, { message: 'msg' }],
  preHandle: [
    req => {
      req.common = 0;
    },
    req => ({ ...req, common: 1 }),
  ],
  postHandle: [
    res => {
      res.success = res.code >= 0;
      res.common = 0;
    },
    res => ({ ...res, success: res.code >= 0, common: 1 }),
  ],
});

const request0Config = {
  method: 'post',
  stringify: true,
  settings: { headers: { header0: 'header0' } },
  url: `http://localhost:${port}/url0`,
  req: { key1: 'key11', key2: 'key12' },
  refactor: {
    newData1: 'data',
    _newData1: [{ newImages1: 'images', _newImages1: [{ newUrl1: 'url' }] }],
  },
  pre: req => {
    req.request0 = 0;
  },
  post: res => {
    res.request0 = 0;
  },
};

const request1Config = {
  method: [undefined, 'post', 'put'],
  stringify: [undefined, undefined, true],
  settings: [
    { headers: { header0: 'header0' } },
    { headers: { header1: 'header1' } },
  ],
  url: [
    `http://localhost:${port}/url11`,
    `http://localhost:${port}/url12`,
    `http://localhost:${port}/url13`,
  ],
  requestKeys: [
    { key1: 'key11', key2: 'key12' },
    { key1: 'key21', key2: 'key2' },
  ],
  responseRefactor: [
    {
      newData1: 'data',
      _newData1: [{ newImages1: 'images', _newImages1: [{ newUrl1: 'url' }] }],
    },
    {
      newData2: 'data',
      _newData2: [{ newImages2: 'images', _newImages2: [{ newUrl2: 'url' }] }],
    },
  ],
  preHandle: [
    req => {
      req.request1 = 0;
    },
    req => ({ ...req, request1: 1 }),
  ],
  postHandle: [
    res => {
      res.request1 = 0;
    },
    res => ({ ...res, request1: 1 }),
  ],
};

seeAjax.config({
  request0: request0Config,
  request1: request1Config,
  request2: {
    url: [`http://localhost:${port}/url21`, `http://localhost:${port}/url22`],
  },
  error: {
    url: [`http://localhost:${port}/error`],
  },
  implement: {
    ...request1Config,
    implement: [
      (cb, params) => {
        cb({ ...clone(response), params });
      },
    ],
  },
});
