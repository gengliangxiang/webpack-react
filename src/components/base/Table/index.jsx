import React from 'react';
import MaterialTable from 'material-table';

const Table = ({
	data,
	columns,
	pagination,
	onPageChange,
	onRowsPerPageChange,
	onRowSelectionChange,
	options,
}) => {
	const { pageSize, page, total } = pagination;
	const _options = React.useMemo(() => {
		let paging = true;
		if (data.length === 0) {
			paging = false;
		}
		return {
			paging,
			selection: true,
			showTitle: false,
			toolbar: false,
			search: false,
			pageSize,
			tableLayout: 'fixed',
			fixedColumns: {
				left: 1,
				right: 1,
			},
			...options,
		};
	}, [data.length, options, pageSize]);
	const changePage = React.useCallback(
		p => {
			onPageChange(p);
		},
		[onPageChange],
	);
	const changeRowsPerPage = React.useCallback(
		p => {
			onRowsPerPageChange(p);
		},
		[onRowsPerPageChange],
	);
	const onSelectionChange = (...arg) => {
		onRowSelectionChange(arg);
	};

	return (
		<MaterialTable
			page={page}
			totalCount={total}
			onSelectionChange={onSelectionChange}
			onChangePage={changePage}
			onChangeRowsPerPage={changeRowsPerPage}
			options={_options}
			localization={{
				body: {
					emptyDataSourceMessage: '暂无数据',
				},
				pagination: {
					labelRowsSelect: '条每页',
					firstTooltip: '第一页',
					previousTooltip: '上一页',
					nextTooltip: '下一页',
					lastTooltip: '最后一页',
					labelDisplayedRows: `第${page + 1}页 共计${total}条`,
				},
			}}
			columns={columns}
			data={data}
		/>
	);
};
export default Table;
