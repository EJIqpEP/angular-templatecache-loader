var path = require('path');
require('../../index.js');

var app = path.join(__dirname, 'app');

module.exports = {
    context: app,
    entry: {
        test: './index.js'
    },
    module: {
        loaders: [
            {
              test: /\.html$/,
              loader: "../../../index.js"
            }
        ]
    },
    output: {
        path: __dirname,
        publicPath: "/",
        filename: "bundle.js"
    },
    resolve: {
        root: app
    }
};
