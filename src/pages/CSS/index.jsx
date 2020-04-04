import React from 'react';

import style from './style.scss';

function DateComponent() {
	return (
		<>
			<p className={style['pointer-events']}>pointer-events</p>
			<p className={style['user-select']}>user-select: none;</p>
		</>
	);
}

export default DateComponent;
