var loaderUtils = require('loader-utils');
var htmlMinifier = require('html-minifier');
var path = require('path');
var jsesc = require('jsesc');

module.exports = function (source) {

  if (this.resource === undefined) {
    throw new Error('resource is not provided');
  }

  var separator = '/';
  var query = loaderUtils.parseQuery(this.query);
  var resourcePath;
  var root = process.cwd();
  var outputPath;
  var outputSource = '';

  var prefix = query.prefix || '';
  var module = query.module ? query.module : 'ng';

  // Change separators to unix style
  prefix = prefix.replace(/\\/g, separator);
  resourcePath = this.resource.replace(/\\/g, separator);
  root = root.replace(/\\/g, separator);

  if (prefix) {
    outputPath = prefix + resourcePath.replace(root, '');
  } else {
    outputPath = resourcePath.replace(root, '').slice(1);
  }

  this.cacheable && this.cacheable();

  if (source) {
    outputSource = htmlMinifier.minify(source, {
        removeComments: true,
        removeCommentsFromCDATA: true,
        removeCDATASectionsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        minifyJS: true,
        minifyCSS: true
    });

  }

    var escapedOutput = jsesc(outputSource);


  return "var v1='" + escapedOutput + "';\n" +
    "angular.module('" + module + "').run(['$templateCache', function ($templateCache) {" +
    "$templateCache.put('" + outputPath + "', v1);"+
  "}]);\n" +
  "module.exports=v1";
}
