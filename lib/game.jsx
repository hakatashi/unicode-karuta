const React = require('react');
const CSSModules = require('react-css-modules');
const ReactPlayer = require('react-player');
const styles = require('./game.pcss');

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
		this.onvoicechanged = () => {
			this.setState({
				voices: speechSynthesis.getVoices(),
			});
		};

		speechSynthesis.addEventListener('voiceschanged', this.onvoicechanged);
		this.onvoicechanged();
	}

	componentWillUnmount() {
		speechSynthesis.removeEventListener('voiceschanged', this.onvoicechanged);
	}

	utterVoice = (event) => {
		event.preventDefault();

		const voiceName = event.target.getAttribute('data-name');
		const utterance = new SpeechSynthesisUtterance('Hello.');
		utterance.voice = this.state.voices.find((voice) => voice.name === voiceName);
		speechSynthesis.speak(utterance);

		this.setState({bgmPlaying: true});
	}

	render() {
		return (
			<div styleName="wrap">
				<h1 styleName="head">unicode-karuta</h1>
				<ReactPlayer styleName="player" url="https://soundcloud.com/funappy_0/bgm" width={300} height={300} playing={this.state.bgmPlaying} loop controls volume={1} />
				<ul>
					{this.state.voices.map((voice) => (
						<li data-name={voice.name} key={voice.voiceURI} onClick={this.utterVoice}>{voice.name}</li>
					))}
				</ul>
			</div>
		);
	}
}

module.exports = CSSModules(Game, styles);
