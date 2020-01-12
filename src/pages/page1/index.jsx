import React from 'react';
import reactLogo from '@images/React.svg';
import { Button } from 'antd';

class DateComponent extends React.Component {
	render() {
		return (
			<div>
				<div>
					<Button type="primary" style={{ marginLeft: 8 }}>
						Primary Button
					</Button>
					<img src={reactLogo} alt="" />
				</div>
			</div>
		);
	}
}
export default DateComponent;
