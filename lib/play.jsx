const React = require('react');
const CSSModules = require('react-css-modules');
const sampleSize = require('lodash/sampleSize');
const {List} = require('immutable');

const Clock = require('./clock.jsx');

const styles = require('./play.pcss');
const characters = require('../characters.yml');

class Play extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeCharacterIndex: 0,
			characters: List(sampleSize(characters, 12)),
		};
	}

	render() {
		const activeCharacter = this.state.characters.get(this.state.activeCharacterIndex);

		return (
			<div styleName="play">
				<div styleName="name-card-area">
					<div styleName="name-card">
						U+{activeCharacter.codepoint.toString(16).toUpperCase().padStart(4, '0')}
						{' '}
						{activeCharacter.name}
					</div>
				</div>
				<div styleName="character-cards-area">
					<div styleName="character-cards">
						{this.state.characters.map((character) => (
							<div key={character.codepoint} styleName="character-card-area">
								<div styleName="character-card">
									<div styleName="character-body">
										{String.fromCodePoint(character.codepoint)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div styleName="information-area">
					<div styleName="clock">
						<Clock/>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = CSSModules(Play, styles, {handleNotFoundStyleName: 'log'});
