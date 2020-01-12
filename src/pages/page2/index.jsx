import React from 'react';
import { renderRoutes } from 'react-router-config';
import webpackLogo from '@images/webpack.svg';
import Route from '@router/config';

class DateComponent extends React.Component {
	render() {
		return (
			<div>
				<div>
					<img src={webpackLogo} alt="" />
					{renderRoutes(Route.routes)}
				</div>
			</div>
		);
	}
}
export default DateComponent;
