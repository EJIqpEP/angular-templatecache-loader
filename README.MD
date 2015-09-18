# Angular templatecache webpack loader

Puts HTML files to Angular $templateCache.

## Features
1. You can use ng-include directives with require syntax
2. You will always have the content of the file in assigned variable

## Examples

main.js
```javascript
var myTemplate = require('./src/myTemplate.html');  // You will have your template in myTemplate variable
```

index.html
```javascript
<div ng-include="'src/myTemplate.html'"></div>
```
