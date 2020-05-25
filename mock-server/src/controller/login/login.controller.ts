import {
	Controller,
	Post,
	HttpCode,
	Headers,
	Body,
	Query,
	Get,
} from '@nestjs/common';
import { AppService } from '../../service/app.service';
import { IUser, IEncryptionBody, IResponse } from '../../interface/app';

@Controller('/login')
export class LoginController {
	constructor(private readonly appService: AppService) {}
	@Post('/login')
	@HttpCode(200)
	login(@Body() body:IEncryptionBody): Object {
		const params: IUser = this.appService.RAS(body.data);
		let responseCode: string = '100';
		let responseMessage: string = '用户名或密码错误';
		let responseData: object = {};
		if (params.userName === 'admin' && params.password === 'aaaa1111') {
			responseCode = '200';
			responseMessage = 'success';
			responseData = { name: 'admin' };
		}
		const data: IResponse = {
			responseCode,
			responseMessage,
			responseData,
		};
		return data;
	}
	@Get('/loginout')
	@HttpCode(200)
	loginout(@Query() query, @Headers() header): Object {
		const data = {
			responseCode: '200',
			responseMessage: '操作成功',
			responseData: '成功',
		};
		return data;
	}
}
