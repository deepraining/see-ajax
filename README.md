# A wrapped jquery ajax handling, with custom request keys, response refactoring, pre handling, post handling.

## requirements

* [jquery](https://github.com/jquery/jquery)
* [json-refactor](https://github.com/senntyou/json-refactor)

## quick start

### 1. load resources

```
var seeAjax = require('jquery.seeAjax');
seeAjax.doSomething

// or
 var $ = require('jquery');
$.seeAjax.doSomething
```

or load scripts directly

```
<script src="path/to/jquery"></script>
<script src="path/to/json-refactor"></script>
<script src="path/to/jquery.seeAjax"></script>
<script>
seeAjax.doSomething
// or
$.seeAjax.doSomething
</script>
```

### 2. config current application's options

```
seeAjax.config({...});
```

### 3. use

```
seeAjax.get(urlName, reqData, callback);
```

## config options

example: 

```
{
    env: 0/1/2/3, // environment
    name: {...},
    url: {...},
    requestKeys: {...},
    responseRefactor: {...},
    preHandle: {...},
    postHandle: {...},
    implement: {...}
}
```

### env

environment index, used to select a element of an array within `url`, `requestKeys`, `responseRefactor`, `preHandle`, `postHandle`, `implement`

### name

url name mapping, used to get values of `url`, `requestKeys`, `responseRefactor`, `preHandle`, `postHandle`, `implement`

```
name: {
    exportName: 'inlineName'
}

url: {inlineName: []}
requestKeys: {inlineName: []}
responseRefactor: {inlineName: []}
preHandle: {inlineName: []}
postHandle: {inlineName: []}
implement: {inlineName: []}
```

### url

url to request data

```
url: {inlineName: [
    'url1', //env: 0
    'url2', //env: 1
    'url3', //env: 2
]}

// or
url: {
    // all environments will use this url
    inlineName: 'url'
}
```

### requestKeys

request keys mapping

```
requestKeys: {inlineName: [
    {exportKey: 'realKey'}, // env: 0
    {exportKey: 'realKey'}, // env: 1
    {exportKey: 'realKey'}, // env: 2
]}

// or
requestKeys: {
    // all environments will use this map
    inlineName: {exportKey: 'realKey'}
}
```

### responseRefactor

refactor response data, after ajax responding

```
responseRefactor: {
    common: []/{}, // common is system reserved keywork, this will apply to all requests
    inlineName: [
        {... refactor map ...}, // env: 0
        {... refactor map ...}, // env: 1
        {... refactor map ...}, // env: 2
    ]
}

// or 
responseRefactor: {
    // all environments will use this map
    inlineName: {... refactor map ...}
}
```

* `refactor map`: see [json-refactor](https://github.com/senntyou/json-refactor)

### preHandle

more handling after `requestKeys`, before ajax sending

```
preHandle: {
    common: (reqData) => {... do something ...}, // common is system reserved keywork, this will apply to all requests
    inlineName: [
        (reqData) => {... do something ...}, // env: 0
        (reqData) => {... do something ...}, // env: 1
        (reqData) => {... do something ...}, // env: 2
    ]
}

// or 
preHandle: {
    // all environments will use this hanlder
    inlineName: (reqData) => {... do something ...}
}
```

### postHandle

more handling after `responseRefactor`

```
postHandle: {
    common: (res, reqData, urlName) => {... do something ...}, // common is system reserved keywork, this will apply to all requests
    inlineName: [
        (res, reqData, urlName) => {... do something ...}, // env: 0
        (res, reqData, urlName) => {... do something ...}, // env: 1
        (res, reqData, urlName) => {... do something ...}, // env: 2
    ]
}

// or 
postHandle: {
    // all environments will use this hanlder
    inlineName: (res, reqData, urlName) => {... do something ...}
}
```

### implement

custom implement instead of ajax.
 
sometimes, you have not to use ajax, but other ways, for some reasons, this is what you want.

```
implement: {
    inlineName: [
        (res, reqData, urlName) => {... return a response ...}, // env: 0
        (res, reqData, urlName) => {... return a response ...}, // env: 1
        (res, reqData, urlName) => {... return a response ...}, // env: 2
    ]
}

// or 
implement: {
    // all environments will use this hanlder
    inlineName: (res, reqData, urlName) => {... return a response ...}
}
```

* `note`: every function should return a value, like ajax response

## api

### config

config options of current application

```
seeAjax.config({ ....});
```

### getEnv

get current environment

```
var env = seeAjax.getEnv(); // 0/1/2/3
```

### get

make a `GET` request

```
seeAjax.get(urlName, reqData, callback)
seeAjax.get(urlName, reqData, callback, type)
seeAjax.get(urlName, reqData, callback, extraOptions)
seeAjax.get(urlName, reqData, callback, type, extraOptions)
```

### post

make a `POST` request

```
seeAjax.post(urlName, reqData, callback)
seeAjax.post(urlName, reqData, callback, type)
seeAjax.post(urlName, reqData, callback, stringify)
seeAjax.post(urlName, reqData, callback, extraOptions)
seeAjax.post(urlName, reqData, callback, type, extraOptions)
seeAjax.post(urlName, reqData, callback, stringify, extraOptions)
seeAjax.post(urlName, reqData, callback, type, stringify, extraOptions)
```

### put 

make a `PUT` request, this needs browser's supporting.

```
// like post
```

### delete 

make a `DELETE` request, this needs browser's supporting.

```
// like post
```

## `get/post/put/delete` arguments

### urlName

export url name, refer to `option.name`

### reqData

request data, refer to [https://api.jquery.com/jQuery.ajax/](https://api.jquery.com/jQuery.ajax/)

### callback

success callback, refer to [https://api.jquery.com/jQuery.ajax/](https://api.jquery.com/jQuery.ajax/)

### type

response data type, default is `json`, refer to [https://api.jquery.com/jQuery.ajax/](https://api.jquery.com/jQuery.ajax/)

### stringify

whether stringify request data, default is `false`, and request will use `application/x-www-form-urlencoded`.
if `true`, request will use a string in the body.

### extraOptions

extra more ajax options, refer to [https://api.jquery.com/jQuery.ajax/](https://api.jquery.com/jQuery.ajax/)

## handlers sequences while processing

1. `url`: get real url
2. `requestKeys`:  get real request data
3. `preHandle`: more handling before send a request
    1. `common`: common handling, if have
    2. `yourName`: named handling
4. `implement`: if have, return a custom response data, and will not send an ajax
5. `responseRefactor`: refactoring response data
    1. `common`: common handling, if have
    2. `yourName`: named handling
6. `postHandle`: more handling after refactoring response data
    1. `common`: common handling, if have
    2. `yourName`: named handling
    
## [demo code](./example)