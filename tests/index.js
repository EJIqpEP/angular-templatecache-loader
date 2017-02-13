var cwd = process.cwd();
var path = require('path');
var expect = require('chai').expect;
var should = require('chai').should();
var libPath = 'index.js';
var lib = require(path.join(cwd, libPath));

var run = function (resource, prefix, options) {
    var params = {
        resource: resource,
        options: context
    };

    if (prefix !== undefined) {
        params.query = '?prefix=' + prefix;
    }

    return lib.call(this, params);
};

var generateExports = function (html, filePath, module) {
    var moduleName = module || 'ng';
    return 'var v1=\'' + html + '\';' +
        '\nangular.module(\'' + moduleName + '\').run([\'$templateCache\', function ($templateCache) {' +
        '$templateCache.put(\'' + filePath + '\', v1);}]);' +
        '\nmodule.exports=v1';
};

describe('angular-templacache-loader', function () {
    it('should return correct module exports on windows', function () {
        var mockHtml = '<div>lol</div>';
        var filePath = 'simple.html';
        var result = lib.call({
            resource: cwd + '\\simple.html',
            query: ''
        }, mockHtml);

        expect(result).to.equal(generateExports(mockHtml, filePath));
    });

    it('should throw error if resource is not defined', function () {
        expect(function () {
            lib.call({
                query: ''
            }, '');
        }).to.throw('resource is not provided');
    });

    it('should return correct module exports on unix', function () {
        var mockHtml = '<div>lol</div>';
        var filePath = 'simple.html';
        var windowsFilePath = cwd + '/' + filePath;
        var unixFilePath = windowsFilePath.replace(/\\/g, '/');
        var result = lib.call({
            resource: unixFilePath,
            query: ''
        }, mockHtml);

        expect(result).to.equal(generateExports(mockHtml, filePath));
    });

    it('should return correct module exports with module name', function () {
        var mockHtml = '<div>lol</div>';
        var filePath = 'simple.html';
        var result = lib.call({
            resource: cwd + '\\simple.html',
            query: '?module=app'
        }, mockHtml);

        expect(result).to.equal(generateExports(mockHtml, filePath, 'app'));
    });

    it('should return correct module exports with prefix', function () {
        var mockHtml = '<div>lol</div>';
        var filePath = '/public/src/simple.html';
        var result = lib.call({
            resource: cwd + '\\simple.html',
            query: '?prefix=/public/src'
        }, mockHtml);

        expect(result).to.equal(generateExports(mockHtml, filePath));
    });

    it('should get root from webpack config', function () {
        var mockHtml = '<div>lol</div>';
        var filePath = 'views/simple.html';
        var result = lib.call({
            resource: cwd + '\\app\\views\\simple.html',
            options: {
                context: path.join(__dirname, '../app')
            }
        }, mockHtml);

        expect(result).to.equal(generateExports(mockHtml, filePath));
    });
});
