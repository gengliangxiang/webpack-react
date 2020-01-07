import React from 'react';
import reactLogo from '@images/React.svg';
import webpackLogo from '@images/webpack.svg';

import style from './style.scss';

class DateComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
		};
	}

	componentDidMount() {
		this.timerID = setInterval(() => this.tick(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		this.setState({
			date: new Date(),
		});
	}

	render() {
		const { date } = this.state;
		return (
			<div>
				<div className={style.title}>时间</div>
				<div>
					<img className={style.logo} src={reactLogo} alt="" />
					<img className={style.logo} src={webpackLogo} alt="" />
				</div>
				<div className={style.title}>{date.toLocaleTimeString()}</div>
			</div>
		);
	}
}
export default DateComponent;
