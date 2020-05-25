import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { AppService } from '../../service/app.service';
import * as Mock from 'mockjs';
import { IResponse } from '../../interface/app';

const { Random } = Mock;
const tableData = Mock.mock({
	'data|5-10': [
		{
			'id|+1': '@id',
			email: '@email',
			title: '@ctitle',
			description: '@ctitle(20)',
			date: '@date',
			name: '@cname',
			word: '@word',
			cword: '@cword',
			adress: () => Random.province() + Random.city() + Random.county(),
			phone: /^1[356789][1-9]\d{8}/,
			'type|0-3': 0,
			'age|10-30': 0,
		},
	],
});

@Controller('table')
export class TableController {
	constructor(private readonly appService: AppService) {}
	@Post('')
	@HttpCode(200)
	login(): Object {
		const data: IResponse = {
			responseCode: '200',
			responseMessage: 'success',
			responseData: tableData.data,
		};
		return data;
	}
}
