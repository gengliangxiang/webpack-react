import loadable from '@router/loadable';

const routes = [
	{
		path: '/login',
		component: loadable(() => import('@pages/login/index')),
	},
	{
		path: '/',
		component: loadable(() => import('@layout/index')),
		requiresAuth: true,
		routes: [
			{
				path: '/home',
				exact: true,
				component: loadable(() => import('@pages/page1/index')),
				requiresAuth: true,
			},
			{
				path: '/webpack',
				component: loadable(() => import('@pages/page2/index')),
				requiresAuth: true,
			},
			{
				path: '/table',
				component: loadable(() => import('@components/TableData/index')),
				requiresAuth: true,
			},
			{
				path: '/date',
				component: loadable(() => import('@components/Date/index')),
				requiresAuth: true,
			},
			{
				path: '/CSS',
				component: loadable(() => import('@pages/CSS/index')),
				requiresAuth: true,
			},
			// {
			// 	path: '/webpack',
			// 	component: Detail,
			// 	routes: [
			// 		{
			// 			path: '/detail/table',
			// 			component: Table,
			// 		},
			// 	],
			// },
		],
	},
];
export default routes;
