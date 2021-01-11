const path = require('path');
const webpack = require('webpack');
const env = require('dotenv').config();

module.exports = env => {
    return {
        entry: './src/app.js',
        mode: 'production',
        output: {
            filename: 'app.min.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins:[],
    }
};