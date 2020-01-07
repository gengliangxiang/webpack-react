import { Service } from "egg";
import * as Mock from "mockjs";

const data = Mock.mock({
	"list|1-10": [
		{
			"id|+1": '@id',
			email: "@email",
			contactPerson: "@ctitle",
			cstNm: "@cname",
			phone: /^[1][3,4,5,6,7,8][0-9]{9}$/,
			"cstTpCd|1-10": 0,
			"intSt|1-3": 0
		}
	]
});

export default class Mine extends Service {
	public async getList() {
		this.ctx.body = {
			status: 200,
			data: {
				list: data.list,
				total: data.list.length,
				pageNum: 1
			}
		};
	}
}
