import React, { useState, useEffect } from 'react';
import webpackLogo from '@images/webpack.svg';
import { Button } from 'antd';

function DComponent() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		document.title = `You clicked ${count} times`;
	});
	const str = `You clicked ${count} times`;
	return (
		<div>
			<p>{str}</p>
			<Button
				type="primary"
				style={{ marginLeft: 8 }}
				onClick={() => setCount(count + 1)}
			>
				Click me
			</Button>
			<img src={webpackLogo} alt="" />
		</div>
	);
}
export default DComponent;
