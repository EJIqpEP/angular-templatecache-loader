var a = require('views/myTemplate.html');
var app = angular.module('app', []);

app.run(function ($templateCache) {
  console.log('tt', $templateCache.info());
});

console.log('a', a);
