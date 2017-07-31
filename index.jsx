require('babel-polyfill');

const React = require('react');
const ReactDOM = require('react-dom');

const Game = require('./lib/game.jsx');

require('!!style-loader?sourceMap!css-loader!postcss-loader?sourceMap!./index.pcss');

ReactDOM.render(
	<Game/>,
	document.querySelector('.app')
);
