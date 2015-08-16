var loaderUtils = require('loader-utils');
var htmlMinifier = require("html-minifier");
var path = require('path');

var stub = 'var v$i=$val;\n' +
    'window.angular.module(["ng"])' +
    '.run(["$templateCache",function(c){' +
    'c.put("$key", v$i)' +
    '}]);';

module.exports = function (source) {
  var loaderContext = this,
      query = loaderUtils.parseQuery(loaderContext.query),
      module = query.module ? query.module : 'ng',
      resource = this.resource.split(path.sep),
      fileName = resource.pop(),
      projectResourcePath;

  if (query.prefix) {
    projectResourcePath = path.join(query.prefix, '/', fileName);
  } else {
    projectResourcePath = loaderContext.resource.replace(__dirname, '');
  }

  loaderContext.cacheable && loaderContext.cacheable();

  source = htmlMinifier.minify(source, {
      removeComments: true,
      removeCommentsFromCDATA: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      preserveLineBreaks: true,
      removeEmptyAttributes: true,
      keepClosingSlash: true
  });



  // stub.replace(/\$([\w\d_\-]+)/g, function (match, name) {
  //   console.log('mmm', match, name);
  //   return
  // });
  // this.cacheable();
  var lol = 'lol';
  return "var v1='" + source + "';\n" +
    "angular.module('" + module + "').run(['$templateCache', function ($templateCache) {" +
    "$templateCache.put('" + projectResourcePath + "', 'home!!!!');"+
  "}]);\n" +
  "module.exports=v1";
}
