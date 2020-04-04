import loadable from '@router/loadable';

const routes = [
	{
		path: '/login',
		component: loadable(() => import('@pages/login/index')),
	},
	{
		path: '/',
		component: loadable(() => import('@layout/index')),
		routes: [
			{
				path: '/home',
				exact: true,
				component: loadable(() => import('@pages/page1/index')),
			},
			{
				path: '/webpack',
				component: loadable(() => import('@pages/page2/index')),
			},
			{
				path: '/table',
				component: loadable(() => import('@components/TableData/index')),
			},
			{
				path: '/date',
				component: loadable(() => import('@components/Date/index')),
			},
			{
				path: '/CSS',
				component: loadable(() => import('@pages/CSS/index')),
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
