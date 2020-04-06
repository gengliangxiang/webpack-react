import React from 'react';
import ReactDom from 'react-dom';
import Router from '@router/index';
import { Provider } from 'mobx-react';
import stores from '@store/index';

import '@style/reset.scss';

ReactDom.render(
	// eslint-disable-next-line react/jsx-props-no-spreading
	<Provider {...stores}>
		<Router />
	</Provider>,
	document.getElementById('app'),
);
