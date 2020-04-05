import React from 'react';

import style from './style.scss';

function DateComponent() {
	return (
		<>
			<p className={style['pointer-events']}>pointer-events</p>
			<p className={style['user-select']}>user-select: none;</p>
			<p className={style.hyphens}>
				英语单词换行自动添加连字符 “-” The API documentation of the Link
				React component. Learn more about the props and the CSS
				customization points.
			</p>
			<p className={style['text-transform']}>text-transform</p>
			<p className={style['font-variant']}>font-variant显示小型大写字母的字体。</p>
		</>
	);
}

export default DateComponent;
