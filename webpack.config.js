const path = require('path');
const {HotModuleReplacementPlugin} = require('webpack');

module.exports = (env = {}) => ({
	entry: './index.jsx',
	output: {
		path: __dirname,
		filename: 'index.js',
	},
	devtool: env.production ? 'source-map' : 'cheap-module-eval-source-map',
	devServer: {
		hot: true,
		host: '0.0.0.0',
		disableHostCheck: true,
	},
	module: {
		rules: [{
			test: /\.jsx$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			options: {
				presets: [
					['env', {
						targets: {
							browsers: [
								'last 2 Chrome versions',
							],
							useBuiltIns: true,
						}
					}],
					'react',
				],
				plugins: ['transform-class-properties'],
			},
		}, {
			test: /\.yml$/,
			exclude: /node_modules/,
			use: ['json-loader', 'yaml-loader'],
		}, {
			test: /\.pcss$/,
			exclude: /node_modules/,
			use: [{
				loader: 'style-loader',
				options: {
					sourceMap: true,
				},
			}, {
				loader: 'css-loader',
				options: {
					modules: true,
					localIdentName: '[name]__[local]--[hash:base64:5]',
					importLoaders: 1,
				},
			}, {
				loader: 'postcss-loader',
				options: {
					sourceMap: true,
				},
			}],
		}],
	},
	plugins: [
		...(env.production ? [] : [new HotModuleReplacementPlugin()]),
	],
});
