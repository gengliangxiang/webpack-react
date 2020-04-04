import React from 'react';
import { createHashHistory } from 'history';
import login from '@images/login.jpg';
import Button from '@material-ui/core/Button';
import style from './style.scss';

const backgroundStyle = {
	display: 'flex',
	flexDirection: 'column',
	width: '100vw',
	height: '100vh',
	backgroundImage: `url(${login})`,
	backgroundSize: '100% 100%',
};
const history = createHashHistory();

function LoginComponent() {
	return (
		<div style={backgroundStyle}>
			<header className={style.header}>REACT - 管理系统</header>
			<main className={style.main}>
				<Button
					variant="contained"
					color="primary"
					onClick={() => history.push('/home')}
				>
					to Home
				</Button>
			</main>
		</div>
	);
}
export default LoginComponent;
