# Angular templatecache webpack loader

Puts HTML files to Angular $templateCache.


## Features
1. You can use ng-include directives with require syntax
2. You will always have the content of the file in assigned variable

## Install

You can install loader using npm:
```shell
npm i angular-templatecache-loader
```

## Examples

main.js
```javascript
var myTemplate = require('./src/myTemplate.html');  // You will have your template in myTemplate variable
```

index.html
```javascript
<div ng-include="'src/myTemplate.html'"></div>
```

## Options
1. module - name of angular module (default is ng)
```javascript
  {
    test: /\.html$/,
    loader: "angular-templatecache-loader?module=app"
  }
```

2. prefix - add prefix to all file names
```javascript
  {
    test: /\.html$/,
    loader: "angular-templatecache-loader?prefix=/public/src"
  }
```
