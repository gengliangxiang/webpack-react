import React from 'react';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Route from './config';

class Router extends React.Component {
	render() {
		return (
			<HashRouter>
				{renderRoutes(Route)}
			</HashRouter>
		);
	}
}
export default Router;
