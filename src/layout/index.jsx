import React from 'react';
// import { renderRoutes } from 'react-router-config';
import renderRoutes from '@router/renderRoutes';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import SettingsIcon from '@material-ui/icons/Settings';
import Menu from '@layout/Menu/index';
import Header from '@layout/Header/index';
import MyDialog from '@components/business/Dialog/index';

import style from './style.scss';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	setting: {
		position: 'fixed',
		top: '120px',
		right: 0,
		zIndex: 99,
		width: '60px',
		height: '50px',
		cursor: 'pointer',
		lineHeight: '50px',
		textAlign: 'center',
		backgroundColor: 'rgba(0,0,0,.3)',
		borderRadius: '8px 0 0 8px',
	},
	icon: {
		marginTop: '8px',
		color: '#FFF',
		fontSize: 35,
	},
});

function LayoutComponent(props) {
	const classes = useStyles();
	const { route, menuStore, userStore } = props;
	const [open, setOpen] = React.useState(false);
	const { bg } = menuStore;
	const authPath = '/login';
	const { isLogin } = userStore;
	const sidebarClass = classnames(
		style['menu-fixed'],
		style[`sidebar-${bg}`],
	);

	const openDialog = () => {
		setOpen(true);
	};
	const closeDialog = () => {
		setOpen(false);
	};
	const changeSidebar = index => {
		menuStore.changeSidebar(index);
	};

	return (
		<div className={style.layout}>
			<div className={style.menu}>
				<div className={style.sidebar}>
					<div className={style['menu-header']} />
					<Menu />
				</div>
				<div className={sidebarClass} />
			</div>
			<div className={style.layoutRight}>
				<Header />
				<div className={style.content}>
					{renderRoutes(route.routes, isLogin, authPath)}
				</div>
			</div>
			<Card className={classes.setting} onClick={openDialog}>
				<SettingsIcon className={classes.icon} />
			</Card>
			<MyDialog open={open} closeDialog={closeDialog}>
				<Button onClick={() => changeSidebar(1)}>sidebar-1</Button>
				<Button onClick={() => changeSidebar(2)}>sidebar-2</Button>
				<Button onClick={() => changeSidebar(3)}>sidebar-3</Button>
			</MyDialog>
		</div>
	);
}

export default inject('menuStore', 'userStore')(observer(LayoutComponent));
