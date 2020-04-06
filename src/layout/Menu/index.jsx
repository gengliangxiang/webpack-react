import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

export default function NestedList() {
	const classes = useStyles();
	const subheader = (
		<ListSubheader component="div" id="nested-list-subheader">
			Nested List Items
		</ListSubheader>
	);
	const [open, setOpen] = React.useState(true);
	const [selectedIndex, setSelectedIndex] = React.useState(1);

	const handleClick = () => {
		setOpen(!open);
	};
	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
	};

	return (
		<List
			component="nav"
			aria-labelledby="nested-list-subheader"
			subheader={subheader}
			className={classes.root}
		>
			<ListItem
				button
				component={Link}
				to="/login"
				selected={selectedIndex === 0}
				onClick={event => handleListItemClick(event, 0)}
			>
				<ListItemIcon>
					<SendIcon />
				</ListItemIcon>
				<ListItemText primary="login" />
			</ListItem>
			<ListItem
				button
				component={Link}
				to="/home"
				selected={selectedIndex === 1}
				onClick={event => handleListItemClick(event, 1)}
			>
				<ListItemIcon>
					<DraftsIcon />
				</ListItemIcon>
				<ListItemText primary="home" />
			</ListItem>
			<ListItem button onClick={handleClick}>
				<ListItemIcon>
					<InboxIcon />
				</ListItemIcon>
				<ListItemText primary="webpack" />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem
						button
						className={classes.nested}
						component={Link}
						to="/date"
						selected={selectedIndex === 2}
						onClick={event => handleListItemClick(event, 2)}
					>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="date" />
					</ListItem>
					<ListItem
						button
						className={classes.nested}
						component={Link}
						to="/CSS"
						selected={selectedIndex === 3}
						onClick={event => handleListItemClick(event, 3)}
					>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="CSS" />
					</ListItem>
					<ListItem
						button
						className={classes.nested}
						component={Link}
						to="/table"
						selected={selectedIndex === 4}
						onClick={event => handleListItemClick(event, 4)}
					>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Table" />
					</ListItem>
				</List>
			</Collapse>
		</List>
	);
}
