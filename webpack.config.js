/* global module, __dirname, require */
var path = require('path'),
    webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery'


        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: false
        })
    ],


    entry: './app/scripts/custom/main.js',
    resolve: {
        alias: {
            jquery: path.join(__dirname + '/bower_components/jquery/dist/jquery.js'),
            nprogress: path.join(__dirname + '/bower_components/nprogress/nprogress.js'),
            vendor: path.join(__dirname + '/app/scripts/vendor'),
            config: path.join(__dirname + '/app/scripts/custom/config.js')
        }
    },
    output: {
        filename: path.join('./build/scripts/app.js')
    }
};
