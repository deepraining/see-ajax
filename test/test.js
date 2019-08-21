/* eslint-disable no-underscore-dangle */
// This should be the first.
require('./configs');

const seeAjax = require('../lib/cjs');
const server = require('./server');

seeAjax.set({ debug: !1 });

describe('all request tests', () => {
  afterAll(() => {
    seeAjax.setEnv(0);
    server.close();
  });

  test('request a non existed name.', () => {
    const ret = seeAjax('non-exist');

    expect(ret).toBeUndefined();
  });

  test('request "request0"', done => {
    seeAjax('request0', { key1: 1, key2: 2, key3: '3' }, res => {
      const { request } = res;

      expect(seeAjax.getEnv()).toBe(0);

      expect(request.headers.header0).toBe('header0');
      expect(request.method).toBe('POST');
      expect(request.path).toBe('/url0');
      expect(request.url).toBe('/url0');
      expect(Object.keys(request.body).length).toBe(5);
      expect(request.body.key11).toBe(1);
      expect(request.body.key12).toBe(2);
      expect(request.body.key3).toBe('3');
      expect(request.body.common).toBe(0);
      expect(request.body.request0).toBe(0);
      expect(Object.keys(request.query).length).toBe(0);

      expect(res.code).toBe(0);
      expect(res.success).toBe(true);
      expect(res.msg).toBe('success');
      expect(res.message).toBe('success');
      expect(res.common).toBe(0);
      expect(res.request0).toBe(0);
      expect(res.newData1.length).toBe(2);
      expect(Object.keys(res.newData1[0]).length).toBe(4); // id, name, images, newImages1
      expect(Object.keys(res.newData1[0].newImages1[0]).length).toBe(3); // id, url, newUrl1
      expect(res.newData1[0].newImages1[0].newUrl1).toBe('url11');

      done();
    });
  });

  test('request "request1" [env=0].', done => {
    seeAjax('request1', { key1: 1, key2: 2, key3: '3' }, res => {
      const { request } = res;

      expect(seeAjax.getEnv()).toBe(0);

      expect(request.headers.header0).toBe('header0');
      expect(request.method).toBe('GET');
      expect(request.path).toBe('/url11');
      expect(request.url).toContain(
        '/url11?key3=3&key11=1&key12=2&common=0&request1=0'
      );
      expect(Object.keys(request.query).length).toBe(6);
      expect(request.query.key11).toBe('1');
      expect(request.query.key12).toBe('2');
      expect(request.query.key3).toBe('3');
      expect(request.query.common).toBe('0');
      expect(request.query.request1).toBe('0');
      expect(request.query._).toBeDefined();
      expect(Object.keys(request.body).length).toBe(0);

      expect(res.code).toBe(0);
      expect(res.success).toBe(true);
      expect(res.msg).toBe('success');
      expect(res.message).toBe('success');
      expect(res.common).toBe(0);
      expect(res.request1).toBe(0);
      expect(res.newData1.length).toBe(2);
      expect(Object.keys(res.newData1[0]).length).toBe(4); // id, name, images, newImages1
      expect(Object.keys(res.newData1[0].newImages1[0]).length).toBe(3); // id, url, newUrl1
      expect(res.newData1[0].newImages1[0].newUrl1).toBe('url11');

      done();
    });
  });

  test('request "request1" [env=1].', done => {
    seeAjax.setEnv(1);

    seeAjax('request1', { key1: 1, key2: 2, key3: '3' }, res => {
      const { request } = res;

      expect(seeAjax.getEnv()).toBe(1);

      expect(request.headers.header1).toBe('header1');
      expect(request.method).toBe('POST');
      expect(request.path).toBe('/url12');
      expect(request.url).toBe('/url12');
      expect(Object.keys(request.body).length).toBe(5);
      expect(request.body.key21).toBe('1');
      expect(request.body.key2).toBe('2');
      expect(request.body.key3).toBe('3');
      expect(request.body.common).toBe('1');
      expect(request.body.request1).toBe('1');
      expect(Object.keys(request.query).length).toBe(0);

      expect(res.code).toBe(0);
      expect(res.success).toBe(true);
      expect(res.msg).toBe('success');
      expect(res.message).toBe('success');
      expect(res.common).toBe(1);
      expect(res.request1).toBe(1);
      expect(res.newData2.length).toBe(2);
      expect(Object.keys(res.newData2[0]).length).toBe(4); // id, name, images, newImages2
      expect(Object.keys(res.newData2[0].newImages2[0]).length).toBe(3); // id, url, newUrl2
      expect(res.newData2[0].newImages2[0].newUrl2).toBe('url11');

      done();
    });
  });

  test('request "request1" [env=2].', done => {
    seeAjax.setEnv(2);

    seeAjax('request1', { key1: 1, key2: 2, key3: '3' }, res => {
      const { request } = res;

      expect(seeAjax.getEnv()).toBe(2);

      expect(request.method).toBe('PUT');
      expect(request.url).toBe('/url13');
      expect(Object.keys(request.body).length).toBe(3);
      expect(request.body.key1).toBe(1);
      expect(request.body.key2).toBe(2);
      expect(request.body.key3).toBe('3');
      expect(Object.keys(request.query).length).toBe(0);

      done();
    });
  });

  test('request "request2" [env=0].', done => {
    seeAjax.setEnv(0);
    seeAjax.set({ disableCacheField: '__' });

    seeAjax('request2', { key1: 1, key2: 2, key3: '3' }, res => {
      const { request } = res;

      expect(seeAjax.getEnv()).toBe(0);

      expect(request.method).toBe('GET');
      expect(request.url).toContain('/url21?key1=1&key2=2&key3=3&common=0');
      expect(Object.keys(request.query).length).toBe(5);
      expect(request.query.key1).toBe('1');
      expect(request.query.key2).toBe('2');
      expect(request.query.key3).toBe('3');
      expect(request.query.__).toBeDefined();
      expect(Object.keys(request.body).length).toBe(0);

      done();
    });
  });

  test('request "request2" [env=1].', done => {
    seeAjax.setEnv(1);
    seeAjax.set({ disableCache: !1 });

    seeAjax('request2', { key1: 1, key2: 2, key3: '3' }, res => {
      const { request } = res;

      expect(seeAjax.getEnv()).toBe(1);

      expect(request.method).toBe('GET');
      expect(request.url).toBe('/url22?key1=1&key2=2&key3=3&common=1');
      expect(Object.keys(request.query).length).toBe(4);
      expect(request.query.key1).toBe('1');
      expect(request.query.key2).toBe('2');
      expect(request.query.key3).toBe('3');
      expect(request.query._).toBeUndefined();
      expect(request.query.__).toBeUndefined();
      expect(Object.keys(request.body).length).toBe(0);

      done();
    });
  });

  test('request "error" [env=0].', done => {
    seeAjax.setEnv(0);

    seeAjax(
      'error',
      { key1: 1, key2: 2, key3: '3' },
      () => {},
      error => {
        expect(seeAjax.getEnv()).toBe(0);
        expect(error).toBeDefined();
        expect(error.status).not.toBeLessThan(300);

        done();
      }
    );
  });

  test('request "implement" [env=0].', done => {
    seeAjax.setEnv(0);

    seeAjax('implement', { key1: 1, key2: 2, key3: '3' }, res => {
      const { params } = res;

      expect(seeAjax.getEnv()).toBe(0);

      expect(Object.keys(params).length).toBe(5);
      expect(params.key11).toBe(1);
      expect(params.key12).toBe(2);
      expect(params.key3).toBe('3');
      expect(params.common).toBe(0);
      expect(params.request1).toBe(0);

      expect(res.code).toBe(0);
      expect(res.success).toBe(true);
      expect(res.msg).toBe('success');
      expect(res.message).toBe('success');
      expect(res.common).toBe(0);
      expect(res.request1).toBe(0);
      expect(res.newData1.length).toBe(2);
      expect(Object.keys(res.newData1[0]).length).toBe(4); // id, name, images, newImages1
      expect(Object.keys(res.newData1[0].newImages1[0]).length).toBe(3); // id, url, newUrl1
      expect(res.newData1[0].newImages1[0].newUrl1).toBe('url11');

      done();
    });
  });
});
