const React = require('react');
const CSSModules = require('react-css-modules');

const styles = require('./clock.pcss');

class Clock extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			time: '00:00',
		};
	}

	render() {
		return (
			<div styleName="clock">
				<div styleName="circle">
					<div styleName="inner-circle">
						{this.state.time}
					</div>
				</div>
			</div>
		);
	}
}

module.exports = CSSModules(Clock, styles);
