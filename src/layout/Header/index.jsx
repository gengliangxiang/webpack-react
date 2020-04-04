import React from 'react';

import style from './style.scss';

class Menu extends React.Component {
	render() {
		return (
			<div>
				<ul className={style.listbox}>
					<li>用户1</li>
					<li>用户2</li>
					<li>用户3</li>
				</ul>
			</div>
		);
	}
}
export default Menu;
