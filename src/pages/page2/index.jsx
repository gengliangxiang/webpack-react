import React, { useState, useEffect } from 'react';
import webpackLogo from '@images/webpack.svg';
// import { Button } from 'antd';
import Button from '@material-ui/core/Button';

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
				variant="contained"
				color="primary"
				onClick={() => setCount(count + 1)}
			>
				Click me
			</Button>
			<img src={webpackLogo} alt="" />
		</div>
	);
}
export default DComponent;
