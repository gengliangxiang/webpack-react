import React from 'react';
import { renderRoutes } from 'react-router-config';
import classnames from 'classnames';
import Menu from '@layout/Menu/index';

import style from './style.scss';

const sidebar = classnames(style['menu-fixed'], style['sidebar-1']);

function LayoutComponent(props) {
	const { route } = props;
	return (
		<div className={style.layout}>
			<div className={style.menu}>
				<div className={sidebar}>
					<div className={style['menu-header']} />
					<Menu />
				</div>
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
