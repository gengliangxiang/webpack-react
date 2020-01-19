import React, { useState, useEffect } from 'react';
import reactLogo from '@images/React.svg';
import webpackLogo from '@images/webpack.svg';

import style from './style.scss';

function DateComponent() {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => setDate(new Date()), 1000);
		return () => clearInterval(timer);
	});
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

export default DateComponent;
