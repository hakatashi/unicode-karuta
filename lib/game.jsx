const React = require('react');
const CSSModules = require('react-css-modules');
const styles = require('./game.pcss');

class Game extends React.Component {
	render() {
		return (
			<div styleName="wrap">
				<h1 styleName="head">unicode-karuta</h1>
			</div>
		);
	}
}

module.exports = CSSModules(Game, styles);
