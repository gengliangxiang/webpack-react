import { Injectable } from '@nestjs/common';
import * as Mock from "mockjs";

const { Random } = Mock;
const data = Mock.mock({
	"data|5-10": [
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

@Injectable()
export class AppService {
  getHello(): string {
    return data;
  }
}
