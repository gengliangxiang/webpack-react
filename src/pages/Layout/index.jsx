import React from 'react';
import { renderRoutes } from 'react-router-config';
import Menu from '@pages/Layout/Menu/index';

import style from './style.scss';

class LayoutComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			route: props.route,
		};
	}

	render() {
		const { route } = this.state;
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
}
export default LayoutComponent;
