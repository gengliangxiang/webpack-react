import { Controller } from "egg";
import { Get, Post, Prefix } from "egg-shell-decorators";
import * as Mock from "mockjs";

const { Random } = Mock;
const data = Mock.mock({
	"list|1-10": [
		{
			"id|+1": 1,
			email: "@email",
			name: "@cname",
			description: "@ctitle(20)",
			date: "@date",
			phone: /^1[356789][1-9]\d{8}/,
			adress: () => (Random.province() + Random.city() + Random.county()),
			"cstTpCd|1-10": 0,
			"intSt|1-3": 0
		}
	]
});

@Prefix("/api")
export default class UserController extends Controller {
	// 资金方邀请客户列表接口
	@Get("/mine")
	public async getTest() {
		this.ctx.body = {
			status: 200,
			success: true,
			data: data.list
		};
	}
	@Post("/mine")
	public async postTest() {
		this.ctx.body = {
			status: 200,
			success: true,
			data: data.list
		};
	}
}
