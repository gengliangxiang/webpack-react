import React from 'react';
import { renderRoutes } from 'react-router-config';
import Menu from '@layout/Menu/index';

import style from './style.scss';

function LayoutComponent(props) {
	const { route } = props;
	return (
		<div className={style.layout}>
			<div className={style.menu}>
				<Menu />
			</div>
			<div className={style.layoutRight}>
				<div className={style.header}>111</div>
				<div className={style.content}>
					{renderRoutes(route.routes)}
				</div>
			</div>
		</div>
	);
}

export default LayoutComponent;
