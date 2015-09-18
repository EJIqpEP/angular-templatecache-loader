var path = require('path');
require('../../index.js');

module.exports = {
    entry: {
        test: path.join(__dirname, "index.js")
    },
    module: {
        loaders: [
            {
              test: /\.html$/,
              loader: "../../index.js"
            }
        ]
    },
    output: {
        path: __dirname,
        publicPath: "/",
        filename: "bundle.js"
    }
};
