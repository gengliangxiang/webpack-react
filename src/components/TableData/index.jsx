import React from 'react';
import Request from '@http/request';

import style from './style.scss';

class TableComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			thData: ['姓名', '邮箱', '手机', '地址', '说明', '时间'],
			data: [],
		};
	}

	componentDidMount() {
		Request.post('/table', {}).then(data => {
			this.setState({
				data: data.responseData,
			});
		});
	}

	componentWillUnmount() {
		// clearInterval(this.timerID);
	}


	render() {
		const { thData, data } = this.state;
		const th = thData.map((title, index) => <th key={index.toString()}>{title}</th>);
		const tbody = data.map((item, index) => (
			<tr key={index.toString()}>
				<td>{item.name}</td>
				<td>{item.email}</td>
				<td>{item.phone}</td>
				<td>{item.adress}</td>
				<td>{item.description}</td>
				<td>{item.date}</td>
			</tr>
		));
		return (
			<div>
				<div className={style.tableBox}>
					<table>
						<thead><tr>{th}</tr></thead>
						<tbody>{tbody}</tbody>
					</table>
				</div>
			</div>
		);
	}
}
export default TableComponent;
