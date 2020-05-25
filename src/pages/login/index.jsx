import React from 'react';
import { createHashHistory } from 'history';
import loginBg from '@images/login.jpg';
import { Button, Box, TextField } from '@material-ui/core';

import Request from '@http/request';
import style from './style.scss';

const backgroundStyle = {
	display: 'flex',
	flexDirection: 'column',
	width: '100vw',
	height: '100vh',
	backgroundImage: `url(${loginBg})`,
	// backgroundSize: '100% 100%',
};
const history = createHashHistory();

function LoginComponent() {
	const loginParams = {
		userName: '',
		password: '',
	};
	const login = () => {
		console.log(loginParams);
		Request.post('/login/login', loginParams).then(data => {
			if (data.responseCode === '200') {
				history.push('/home');
			}
		});
	};
	const changeValue = (event, type) => {
		loginParams[type] = event.target.value;
	};
	return (
		<div style={backgroundStyle}>
			<header className={style.header}>REACT</header>
			<main className={style.main}>
				<Box component="div" className={style.loginBox}>
					<TextField
						id="filled-required"
						label="用户名"
						defaultValue={loginParams.userName}
						variant="outlined"
						onChange={event => changeValue(event, 'userName')}
						className={style.loginInput}
					/>
					<TextField
						id="outlined-password-input"
						label="密码"
						type="password"
						defaultValue={loginParams.password}
						onChange={event => changeValue(event, 'password')}
						autoComplete="current-password"
						variant="outlined"
						className={style.loginInput}
					/>
					<Button
						className={style.loginButton}
						variant="contained"
						color="primary"
						onClick={() => login()}
					>
						login
					</Button>
				</Box>
			</main>
		</div>
	);
}
export default LoginComponent;
