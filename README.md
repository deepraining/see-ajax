# A wrapped jquery ajax handling, with custom request keys, response refactoring, pre handling, post handling.

## requirements

* [jquery](https://github.com/jquery/jquery)
* [json-refactor](https://github.com/senntyou/json-refactor)

## quick start

### 1. load resources

```
var seeAjax = require('see-ajax');
seeAjax(...);

// or
var $ = require('jquery');
require('see-ajax')
$.seeAjax(...);
```

or load scripts directly

```
<script src="path/to/jquery"></script>
<script src="path/to/json-refactor"></script>
<script src="path/to/jquery.seeAjax"></script>
<script>
seeAjax(...);
// or
$.seeAjax(...);
</script>
```

### 2. config current application

```
seeAjax.config(name, {
    // options: method, stringify, settings, url, requestKeys, responseRefactor, preHandle, postHandle, implement
});
```

### 3. use

```
seeAjax(name, reqData, successCallback, errorCallback);
```

## config options

example: 

```
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
```

### method

tell which http method to request, default is `GET`.

```
method: [
    'delete', // env: 0, use DELETE
    'put', // env: 1, use PUT
    'post'// env: 2, use POST
    // other env, use GET
]
```

### stringify

whether stringify request data, default is `false`, and request will use `application/x-www-form-urlencoded`(`POST`, `PUT`, `DELETE`).
if `true`, request will use a string in the body.

* note: if `GET` method, request data will always not to stringify.

```
stringify: [
    void 0, // env: 0, no
    true // env: 1, yes
    // other env, no
]
```

### settings

extra ajax settings, refer to [https://api.jquery.com/jQuery.ajax/](https://api.jquery.com/jQuery.ajax/)

```
settings: [
    {...}, // env: 0
    {...} // env: 1
]
```

### url

url to request data

```
url: [
    'url1', //env: 0
    'url2', //env: 1
    'url3' //env: 2
]
```

### requestKeys

request keys mapping

```
requestKeys: [
    {displayKey: 'realKey'}, // env: 0
    {displayKey: 'realKey'}, // env: 1
    {displayKey: 'realKey'}, // env: 2
]
```

### responseRefactor

refactor response data, after ajax responding

```
responseRefactor: [
    {... refactor map ...}, // env: 0
    {... refactor map ...}, // env: 1
    {... refactor map ...}, // env: 2
]
```

* `refactor map`: see [json-refactor](https://github.com/senntyou/json-refactor)

### preHandle

more handling after `requestKeys`, before ajax sending

```
preHandle: [
    (reqData) => {... do something ...}, // env: 0
    (reqData) => {... do something ...}, // env: 1
    (reqData) => {... do something ...}, // env: 2
]
```

### postHandle

more handling after `responseRefactor`

```
postHandle: [
    (res, reqData, name) => {... do something ...}, // env: 0
    (res, reqData, name) => {... do something ...}, // env: 1
    (res, reqData, name) => {... do something ...}, // env: 2
]
```

### implement

custom implement instead of ajax.
 
sometimes, you have not to use ajax, but other ways, for some reasons, this is what you want.

```
implement: [
    (res, reqData, name) => {... return a response ...}, // env: 0
    (res, reqData, name) => {... return a response ...}, // env: 1
    (res, reqData, name) => {... return a response ...}, // env: 2
]
```

* `note`: every function should return a value, like ajax response

## api

### config

config current application

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

set current environment

```
seeAjax.setEnv(0/1/2/3);
```

### getEnv

get current environment

```
var env = seeAjax.getEnv(); // 0/1/2/3
```

### seeAjax

make a request

```
seeAjax(name, reqData, successCallback, errorCallback)
```

* `name`: defined request name
    - `note`: `common` is a special request name, for this will apply to all request.
* `reqData`: request data, refer to [https://api.jquery.com/jQuery.ajax/](https://api.jquery.com/jQuery.ajax/)
* `successCallback`: success callback, refer to [https://api.jquery.com/jQuery.ajax/](https://api.jquery.com/jQuery.ajax/)
* `errorCallback`: error callback, refer to [https://api.jquery.com/jQuery.ajax/](https://api.jquery.com/jQuery.ajax/)

## handlers sequences while processing

1. `method`: check which http method to request, default is `GET`.
2. `stringify`: check whether to stringify request data.
3. `settings`: check extra ajax settings.
4. `url`: get request url
5. `requestKeys`:  get real request data
6. `preHandle`: more handling before send a request
    1. `common`: common handling, if have
    2. `name`: named handling
7. `implement`: if have, return a custom response data, and will not send an ajax
8. `responseRefactor`: refactoring response data
    1. `common`: common handling, if have
    2. `name`: named handling
9. `postHandle`: more handling after refactoring response data
    1. `common`: common handling, if have
    2. `name`: named handling
    
## [demo code](./example)