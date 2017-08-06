const React = require('react');
const CSSModules = require('react-css-modules');

const styles = require('./clock.pcss');

class Clock extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			time: '00:00',
			percentage: 0,
		};

		setInterval(() => {
			this.setState({percentage: (this.state.percentage + 0.012) % 1});
		}, 1000 / 30);
	}

	render() {
		const progressAngle = (this.state.percentage * 0.65 + 0.175) * Math.PI * 2;

		return (
			<div styleName="clock">
				<div styleName="circle">
					<svg styleName="progress" viewBox="0 0 100 100">
						<path
							styleName="progress-path"
							d={`
								M 50 50
								L 50 100
								A
									50
									50
									0
									${this.state.percentage < 0.5 ? 0 : 1}
									1
									${-Math.sin(progressAngle) * 50 + 50}
									${Math.cos(progressAngle) * 50 + 50}
								Z
							`}
						/>
					</svg>
					<div styleName="inner-circle">
						{this.state.time}
					</div>
				</div>
			</div>
		);
	}
}

module.exports = CSSModules(Clock, styles);
