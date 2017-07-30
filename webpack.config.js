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
		loaders: [{
			test: /\.jsx$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
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
			test: /\.pcss$/,
			loaders: [
				'style-loader?sourceMap',
				'css-loader?modules&importLoaders=1',
				'postcss-loader?sourceMap',
			],
		}],
	},
	plugins: [
		new HotModuleReplacementPlugin(),
	],
});
