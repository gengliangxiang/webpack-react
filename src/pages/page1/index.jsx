import React from 'react';
import reactLogo from '@images/React.svg';
import Button from '@material-ui/core/Button';

class DateComponent extends React.Component {
	render() {
		return (
			<div>
				<div>
					<Button variant="contained" color="primary">
						Primary Button
					</Button>
					<img src={reactLogo} alt="" />
				</div>
			</div>
		);
	}
}
export default DateComponent;
