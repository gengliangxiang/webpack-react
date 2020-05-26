import React from 'react';
import { HashRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
// import { renderRoutes } from 'react-router-config';
import renderRoutes from '@router/renderRoutes';
import Route from './config';

const authPath = '/login';
function Router(props) {
	const { userStore } = props;
	const { isLogin } = userStore.userInfo;
	return (
		<HashRouter>
			{renderRoutes(Route, isLogin, authPath)}
		</HashRouter>
	);
}
export default inject('userStore')(observer(Router));
