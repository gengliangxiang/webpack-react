import React from 'react';
import ReactDom from 'react-dom';

const hello = 'Hello React'
ReactDom.render(
	<div>
		<div>{hello}</div>
	</div>,
	document.getElementById('app'),
);
