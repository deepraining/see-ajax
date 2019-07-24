# see-ajax

[中文文档](./README.md)

An ajax wrapper, with response refactoring, pre handling, post handling, etc.

## requirements

- [json-refactor](https://github.com/senntyou/json-refactor)
- [reqwest](https://github.com/ded/reqwest)

## related

- [see-fetch](https://github.com/senntyou/see-fetch)

## note

Only for `json` response.

## quick start

```
npm install see-ajax --save
```

```
import seeAjax from 'see-ajax';

// configure application
seeAjax.config(name, {
  method,
  stringify,
  settings,
  url,
  req,
  refactor,
  pre,
  post,
  implement,
});

// make a request
seeAjax(name, params, successCallback, errorCallback);
```

## config options

### `method`: which http method to use

- `type`: `string`
- `default`: `get`

```
'post/put/delete'
```

### `stringify`: whether to stringify request params

- `type`: `bool`
- `default`: `false`

If `true`, the server will receive string, but not `key-value` pairs.

If `GET` method, request params will not stringify at any time.

### `settings`: extra [reqwest](https://github.com/ded/reqwest#options) options

- `type`: `map`
- `default`: `{}`

### `url`: url to request

- `type`: `string`
- `default`: empty string

### `req/requestKeys`: keys mapping of request params

- `type`: `map`
- `default`: `{}`

```
{sourceKey: 'newKey'}
```

### `refactor/responseRefactor`: rules to refactor response using [json-refactor](https://github.com/senntyou/json-refactor)

- `type`: `map`
- `default`: `{}`

```
refactor: rules
```

- `rules`: see [json-refactor](https://github.com/senntyou/json-refactor)

### `pre/preHandle`: more handling to request params

- `type`: `function`

```
(params, name) => {... modify params, or return a new params ...}
```

### `post/postHandle`: more handling to response data

- `type`: `function`

```
(result, params, name) => {... modify result, or return a new result }
```

### `implement`: custom implementing instead of `ajax`

- `type`: `function`

```
(cb, params) => { ... cb(result) }
```

Sometimes, you have to not use `ajax`, but other ways, like html templates.

## api

### `seeAjax.config`: configure application

```
// one
seeAjax.config(name, options);

// multiple
seeAjax.config({
  name1: options1,
  name2: options2,
  ...
});
```

### `seeAjax.setEnv`: set current environment(index to get config options)

```
seeAjax.setEnv(0/1/2/3);
```

If you need multiple environments supports, you can configure all config options by array, and then set a env.

If you don't set an environment, 0 will be the default.

```
seeAjax.config(name, {
  method: [method1, method2, ...],
  stringify: [stringify1, stringify2, ...],
  settings: [settings1, settings2, ...],
  url: [url1, url2, ...],
  req: [req1, req2, ...],
  refactor: [refactor1, refactor2, ...],
  pre: [pre1, pre2, ...],
  post: [post1, post2, ...],
  implement: [implement1, implement2, ...],
});

seeAjax.setEnv(0); // method1, stringify1, url1, ...
seeAjax.setEnv(1); // method2, stringify2, url2, ...
```

### `seeAjax.getEnv`: get current environment

```
const env = seeAjax.getEnv(); // 0/1/2/3
```

### `seeAjax`: make a request

```
seeAjax(name, params, successCallback, errorCallback);
```

- `name`: defined request name
  - `note`: `common` is a special request name, and it will apply to all requests
- `params`: request params
  - `type`: `map`
  - `example`: `{a: 1, b: '2'}`
- `successCallback`: callback when ajax success
  - `example`: `res => { ... }`
- `errorCallback`: callback when ajax occurs errors
  - `example`: `error => { ... }`

### `seeAjax.set`: set custom config

```
seeAjax.set({
  debug: !0,
  disableCache: !0,
  disableCacheField: '_',
});
```

- `debug`: `type: bool` `default: true` whether in debug mode
- `disableCache`: `type: bool` `default: true` disable request cache for `GET, HEAD` methods
- `disableCacheField`: `type: string` `default: _` field name for appending timestamp to original url when `disableCache` is `true`

## handlers sequences while processing

1. `method`: check which http method to use, default is `GET`
2. `stringify`: check whether to stringify request params
3. `settings`: check extra [reqwest](https://github.com/ded/reqwest#options) settings
4. `url`: get request url
5. `req`: get real request params
6. `pre`: more handling before send a request
   1. `common`: common handling, if have
   2. `name`: named handling
7. `implement`: if have, `see-ajax` will not send an `ajax`
8. `refactor`: refactoring response data
   1. `common`: common handling, if have
   2. `name`: named handling
9. `post`: more handling after refactoring response data
   1. `common`: common handling, if have
   2. `name`: named handling
