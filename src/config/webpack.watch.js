const webpack = require('webpack'),
	webpackMerge = require('webpack-merge'),
	commonConfig = require('./webpack.comm.js'),
	path = require('path')
  ImageminPlugin = require('imagemin-webpack-plugin').default,
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  mode: ENV,
  devtool: 'source-map',

  output: {
	path: path.resolve(__dirname, '../../') + '/assets',
	publicPath: '',
	filename: '[name].js',
	chunkFilename: '[id].chunk.js'
  },

  optimization: {
	  minimize: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new BrowserSyncPlugin({
      proxy: 'http://127.0.0.1/edsa-wp/',
      files: ['./*.php', './views/**/*.twig', './assets/**/*.*'],
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../../') + '/src/images',
      to: path.resolve(__dirname, '../../') + '/assets/images',
    }]),
	  new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
  ]
});



