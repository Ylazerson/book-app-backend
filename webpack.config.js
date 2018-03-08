// B''H //


// ----------------------------------------------------------------------
import webpack from 'webpack';
import path    from 'path';
import fs      from 'fs';
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------
const nodeModules = {};

fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------
export default {
    entry    : path.resolve(__dirname, 'src/main.js'),
    target   : 'node',
    output   : {
        path    : path.join(__dirname, 'dist'),
        filename: 'backend.js'
    },
    module   : {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
        ]
    },
    externals: nodeModules,
    plugins  : [
        new webpack.IgnorePlugin(/\.(css|less)$/),
        new webpack.BannerPlugin('require("source-map-support").install();',
            {raw: true, entryOnly: false})
    ],
    devtool  : 'sourcemap'
};
// ----------------------------------------------------------------------

