var path = require('path');
require('../../index.js');

module.exports = {
    entry: {
        test: path.join(__dirname, "index.js")
    },
    module: {
        // preLoaders: [
        //     { test: /\.js$/, loader: 'baggage?[file].html' }
        // ],
        loaders: [
            // replace ../../../index.js with ngtemplate
            {
              test: /\.html$/,
              loader: "../../index.js?prefix=public/templates"
            }
        ]
    },
    output: {
        path: __dirname,
        publicPath: "/",
        filename: "bundle.js"
    }
};
