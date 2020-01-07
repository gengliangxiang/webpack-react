import { Controller } from "egg";
import { Get, Prefix } from "egg-shell-decorators";
import * as Mock from "mockjs";

const { Random } = Mock;
const data = Mock.mock({
	"list|5-10": [
		{
			"id|+1": "@id",
			email: "@email",
			title: "@ctitle",
			description: "@ctitle(20)",
			date: "@date",
			name: "@cname",
			word: "@word",
			cword: "@cword",
			adress: () => (Random.province() + Random.city() + Random.county()),
			phone: /^1[356789][1-9]\d{8}/,
			"type|0-3": 0,
			"age|10-30": 0,
		}
	]
});

@Prefix("/")
export default class HomeController extends Controller {
	@Get("/")
	public async index() {
		this.ctx.body = {
			status: 200,
			success: true,
			data: data.list
		};
	}
}
