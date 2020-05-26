import React from 'react';
import { inject, observer } from 'mobx-react';
import { Icon } from '@material-ui/core';
import { createHashHistory } from 'history';
import style from './style.scss';

function Header(props) {
	const { userStore } = props;
	const [open, setOpen] = React.useState(false);
	const { userName } = userStore.userInfo;
	const show = flag => {
		const status = flag || open;
		setOpen(!status);
	};
	const logout = () => {
		userStore.logout();
		createHashHistory().push('/login');
	};
	return (
		<div className={style.header} onMouseLeave={() => show(true)}>
			<div className={style.userBox}>
				<div onClick={() => show()}>
					用户：
					{userName}
					<Icon className={style.userIcon}>arrow_drop_down</Icon>
				</div>
				{open && (
					<div className={style.logoutBox} onClick={() => logout()}>
						退出登录
					</div>
				)}
			</div>
		</div>
	);
}
export default inject('userStore')(observer(Header));
