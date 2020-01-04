import React from 'react';
import ReactDom from 'react-dom';
import DateComponents from './components/Date/index.jsx';
import './style/reset.scss';

const hello = 'Hello React';
ReactDom.render(
	<div>
		<div>{hello}</div>
		<DateComponents />
	</div>,
	document.getElementById('app')
);
