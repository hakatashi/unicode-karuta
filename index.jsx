const React = require('react');
const ReactDOM = require('react-dom');

const Game = require('./lib/game.jsx');

ReactDOM.render(
	<Game></Game>,
	document.querySelector('.app')
);
