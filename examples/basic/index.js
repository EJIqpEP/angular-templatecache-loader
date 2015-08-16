var app = angular.module('app', []);

var a = require('./myTemplate.html');

app.run(function ($templateCache) {
  console.log('tt', $templateCache.info());
})
console.log('a', a);
