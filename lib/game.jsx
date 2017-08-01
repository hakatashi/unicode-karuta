const React = require('react');
const CSSModules = require('react-css-modules');
const {default: ReactPlayer} = require('react-player');
const styles = require('./game.pcss');
const Play = require('./play.jsx');

const {speechSynthesis, SpeechSynthesisUtterance} = window;

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			voices: [],
			bgmPlaying: false,
		};
	}

	componentDidMount() {
		speechSynthesis.addEventListener('voiceschanged', this.handleVoiceChanged);
		this.handleVoiceChanged();
	}

	componentWillUnmount() {
		speechSynthesis.removeEventListener('voiceschanged', this.handleVoiceChanged);
	}

	handleVoiceChanged = () => {
		this.setState({
			voices: speechSynthesis.getVoices(),
		});
	};

	utterVoice = (text, voiceName) => {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.voice = this.state.voices.find((voice) => voice.name === voiceName);
		utterance.lang = 'en-US';
		utterance.rate = 0.7;
		speechSynthesis.speak(utterance);
	}

	handleClickVoice = async (event) => {
		const voiceName = event.target.getAttribute('data-name');

		event.preventDefault();
		this.setState({bgmPlaying: true});

		const text = 'you plus three zero eight B HIRAGANA LETTER RU';

		for (const word of text.split(' ')) {
			this.utterVoice(word, voiceName);

			await new Promise((resolve) => {
				setTimeout(resolve, 1500);
			});
		}
	}

	render() {
		return (
			<div styleName="game">
				<Play/>
				<ReactPlayer
					styleName="player"
					url="https://www.youtube.com/watch?v=XbMAyw9rknk"
					width={160}
					height={90}
					playing={this.state.bgmPlaying}
					loop
					controls
					volume={0.1}
					youtubeConfig={{
						playerVars: {
							start: 3,
						},
					}}
				/>
			</div>
		);
	}
}

module.exports = CSSModules(Game, styles);
