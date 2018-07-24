# see-ajax

An ajax wrapper, with customizing request keys, refactoring response, pre handling, post handling, etc.

## requirements

* [jquery](https://github.com/jquery/jquery) [optional]
* [json-refactor](https://github.com/senntyou/json-refactor)

## quick start

### 1. load resources

```
const seeAjax = require('see-ajax');
seeAjax(...);
```

or load scripts directly

```
<script src="path/to/jquery"></script>
<script src="path/to/json-refactor"></script>
<script src="path/to/see-ajax"></script>
<script>
seeAjax(...);
</script>
```

### 2. config application

```
seeAjax.config(name, {
    {
        method: [...],
        stringify: [...],
        settings: [...],
        url: [...],
        requestKeys: [...],
        responseRefactor: [...],
        preHandle: [...],
        postHandle: [...],
        implement: [...]
    }
});
```

### 3. use

```
seeAjax(name, reqData, successCallback, errorCallback);
```

## config options

### method

Which http method to use, default is `GET`.

```
method: [
    'delete', // env: 0, use DELETE
    'put', // env: 1, use PUT
    'post'// env: 2, use POST
    // other env, use GET
]
```

### stringify

Whether stringify request data, and put it into `body`, but not in the `header`.

Default is `false`.

* note: If `GET` method, request data will always not stringify.

```
stringify: [
    void 0, // env: 0, no
    true // env: 1, yes
    // other env, no
]
```

### settings

Extra ajax settings, refer to [https://api.jquery.com/jQuery.ajax/](https://api.jquery.com/jQuery.ajax/).

```
settings: [
    {...}, // env: 0
    {...} // env: 1
]
```

### url

Url to request.

```
url: [
    'url1', //env: 0
    'url2', //env: 1
    'url3' //env: 2
]
```

### requestKeys

Request keys mapping.

```
requestKeys: [
    {displayKey: 'realKey'}, // env: 0
    {displayKey: 'realKey'}, // env: 1
    {displayKey: 'realKey'}, // env: 2
]
```

### responseRefactor

Refactor response data, after ajax responding.

```
responseRefactor: [
    {... refactor map ...}, // env: 0
    {... refactor map ...}, // env: 1
    {... refactor map ...}, // env: 2
]
```

* `refactor map`: see [json-refactor](https://github.com/senntyou/json-refactor)

### preHandle

More handling after `requestKeys`, before ajax sending.

```
preHandle: [
    (reqData) => {... do something ...}, // env: 0
    (reqData) => {... do something ...}, // env: 1
    (reqData) => {... do something ...}, // env: 2
]
```

### postHandle

More handling after `responseRefactor`.

```
postHandle: [
    (res, reqData, name) => {... do something ...}, // env: 0
    (res, reqData, name) => {... do something ...}, // env: 1
    (res, reqData, name) => {... do something ...}, // env: 2
]
```

### implement

Custom request implementing instead of ajax.

Sometimes, you have to not use ajax, instead using other ways. So, this is what you want.

```
implement: [
    (cb, reqData) => { ... cb(result) }, // env: 0
    (cb, reqData) => { ... cb(result) }, // env: 1
    (cb, reqData) => { ... cb(result) }, // env: 2
]
```

* `note`: After get you own data, you should call `cb` callback(the first argument) with a result, like ajax response.

## api

### config

Config application.

```
// one
seeAjax.config(name, options);

// multi
seeAjax.config({
    name1: options1,
    name2: options2,
    ...
});
```

### setEnv

Set current environment.

```
seeAjax.setEnv(0/1/2/3);
```

### getEnv

Get current environment.

```
var env = seeAjax.getEnv(); // 0/1/2/3
```

### seeAjax

Make a request.

```
seeAjax(name, reqData, successCallback, errorCallback)
```

* `name`: Defined request name.
    - `note`: `common` is a special request name, for this will apply to all request.
* `reqData`: Request data, refer to [https://api.jquery.com/jQuery.ajax/](https://api.jquery.com/jQuery.ajax/)
* `successCallback`: Success callback, refer to [https://api.jquery.com/jQuery.ajax/](https://api.jquery.com/jQuery.ajax/)
* `errorCallback`: Error callback, refer to [https://api.jquery.com/jQuery.ajax/](https://api.jquery.com/jQuery.ajax/)

### set

Set custom config.

```
set({
    request: $.ajax,
    debug: !0
});
```

* `request`: Config your own request method, default is `jQuery.ajax`.

```
settings => {...}
```

`settings`: Request [settings](https://api.jquery.com/jQuery.ajax/)

* `debug`: Whether in debug mode, default is `true`.

## handlers sequences while processing

1. `method`: Check which http method to use, default is `GET`.
2. `stringify`: Check whether to stringify request data.
3. `settings`: Check extra ajax settings.
4. `url`: Get request url.
5. `requestKeys`: Get real request data.
6. `preHandle`: More handling before send a request.
    1. `common`: Common handling, if have.
    2. `name`: Named handling.
7. `implement`: If have, return a custom response data, and will not send an ajax.
8. `responseRefactor`: Refactoring response data.
    1. `common`: Common handling, if have.
    2. `name`: Named handling.
9. `postHandle`: More handling after refactoring response data.
    1. `common`: Common handling, if have.
    2. `name`: Named handling.

## without `jquery`

By default, `see-ajax` is rely on `jquery`.

However, you can also use your ajax engine to replace `jquery.ajax`, like [reqwest](https://github.com/ded/reqwest).

If you do so, you should make it like this:

```
const seeAjax = require('see-ajax/dist/see-ajax.custom');
const reqwest = require('reqwest');

seeAjax.set({
    request: reqwest
});

// or

seeAjax.set({
    request: settings => {
        // do some with settings

        reqwest(settings);
    }
});

// ..., others is the same
```

## [demo code](./example)
