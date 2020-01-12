import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from '@pages/page1/index';
import Detail from '@pages/page2/index';

class Menu extends React.Component {
	render() {
		return (
			<HashRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/webpack" component={Detail} />
				</Switch>
			</HashRouter>
		);
	}
}
export default Menu;
