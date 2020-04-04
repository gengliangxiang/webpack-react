import React from 'react';
import { HashRouter, Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class Sider extends React.Component {
	render() {
		return (
			<HashRouter>
				<List>
					<ListItem>
						<Link to="/login">Login</Link>
					</ListItem>
					<ListItem>
						<Link to="/home">React</Link>
					</ListItem>
					<ListItem>
						<Link to="/webpack">Webpack</Link>
					</ListItem>
					<ListItem>
						<Link to="/table">Table</Link>
					</ListItem>
					<ListItem>
						<Link to="/date">Date</Link>
					</ListItem>
					<ListItem>
						<Link to="/CSS">CSS</Link>
					</ListItem>
				</List>
			</HashRouter>
		);
	}
}
export default Sider;
