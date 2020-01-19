import React from 'react';
import ReactDom from 'react-dom';
import Router from '@router/index';

import '@style/reset.scss';
import 'antd/dist/antd.css';

ReactDom.render(
	<Router />,
	document.getElementById('app'),
);
