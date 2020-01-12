import Layout from '@pages/Layout/index';
import React from '@pages/page1/index';
import Webpack from '@pages/page2/index';
import Table from '@components/TableData/index';
import DateComponent from '@components/Date/index';

const routes = [
	{
		component: Layout,
		routes: [
			{
				path: '/',
				exact: true,
				component: React,
			},
			{
				path: '/webpack',
				exact: true,
				component: Webpack,
			},
			{
				path: '/table',
				exact: true,
				component: Table,
			},
			{
				path: '/date',
				exact: true,
				component: DateComponent,
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
