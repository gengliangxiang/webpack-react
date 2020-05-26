import React from 'react';
import { Link } from 'react-router-dom';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Collapse,
	Icon,
} from '@material-ui/core';
import style from './style.scss';

const expandLess = <Icon>expand_less</Icon>;
const expandMore = <Icon>expand_more</Icon>;
const muneData = [
	// {
	// 	primary: 'login',
	// 	link: '/login',
	// 	icon: 'account_circle',
	// },
	{
		primary: 'home',
		link: '/home',
		icon: 'drafts',
	},
	{
		primary: 'webpack',
		link: '/webpack',
		icon: 'inbox',
		items: [
			{
				primary: 'date',
				link: '/date',
				icon: 'date_range',
			},
			{
				primary: 'CSS',
				link: '/CSS',
				icon: 'style',
			},
			{
				primary: 'Table',
				link: '/table',
				icon: 'table_chart',
			},
		],
	},
];

export default function NestedList() {
	const [selected, setselected] = React.useState('/home');
	const [open, setOpen] = React.useState('');

	const itemClick = item => {
		const data = { ...item };
		if (data.items && data.items.length) {
			const nowOpen = open !== data.primary ? data.primary : '';
			setOpen(nowOpen);
		} else {
			setselected(item.link);
		}
	};

	const mune = muneData.map(data => (
		<div key={data.primary}>
			{!data.items && (
				<ListItem
					button
					component={Link}
					to={data.link}
					className={
						selected === data.link
							? style.listItemSelected
							: style.listItem
					}
					onClick={() => itemClick(data)}
				>
					<ListItemIcon>
						<Icon className={style.itemIcon}>{data.icon}</Icon>
					</ListItemIcon>
					<ListItemText primary={data.primary} />
				</ListItem>
			)}
			{!!data.items && (
				<>
					<ListItem
						button
						className={style.listItem}
						onClick={() => itemClick(data)}
					>
						<ListItemIcon>
							<Icon className={style.itemIcon}>{data.icon}</Icon>
						</ListItemIcon>
						<ListItemText primary={data.primary} />
						{open === data.primary ? expandLess : expandMore}
					</ListItem>
					<Collapse
						in={open === data.primary}
						timeout="auto"
						unmountOnExit
					>
						<List
							component="div"
							disablePadding
							className={style.nested}
						>
							{data.items.map(items => (
								<ListItem
									button
									key={items.link}
									component={Link}
									to={items.link}
									className={
										selected === items.link
											? style.listChildrenSelected
											: style.listChildrenItem
									}
									onClick={() => itemClick(items)}
								>
									<ListItemIcon>
										<Icon className={style.itemIcon}>
											{items.icon}
										</Icon>
									</ListItemIcon>
									<ListItemText primary={items.primary} />
								</ListItem>
							))}
						</List>
					</Collapse>
				</>
			)}
		</div>
	));

	return (
		<List
			component="nav"
			aria-labelledby="nested-list-subheader"
			className={style.navRoot}
		>
			{mune}
		</List>
	);
}
