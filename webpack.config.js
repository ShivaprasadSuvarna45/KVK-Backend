 var path = require('path');
 var webpack=require('webpack');
 var nodeExternals = require('webpack-node-externals');
module.exports = {
     entry: './bin/www',
     output: {
         path: path.resolve(__dirname,'dist'),
         filename: 'server.js',
     },
      target: 'node',
      externals: [nodeExternals()],
      module: {
         loaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}]
        
     },
     plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ]
 }