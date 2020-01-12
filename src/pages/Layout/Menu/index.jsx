import React from 'react';
import { HashRouter, Link } from 'react-router-dom';
import { Menu } from 'antd';

class Sider extends React.Component {
	render() {
		return (
			<HashRouter>
				<Menu>
					<Menu.Item>
						<Link to="/">React</Link>
					</Menu.Item>
					<Menu.Item>
						<Link to="/webpack">Webpack</Link>
					</Menu.Item>
					<Menu.Item>
						<Link to="/table">Table</Link>
					</Menu.Item>
					<Menu.Item>
						<Link to="/date">Date</Link>
					</Menu.Item>
				</Menu>
			</HashRouter>
		);
	}
}
export default Sider;
