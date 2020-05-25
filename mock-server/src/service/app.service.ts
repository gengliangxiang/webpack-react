import { Injectable } from '@nestjs/common';
import * as NodeRSA from 'node-rsa';

@Injectable()
export class AppService {
	RAS(data: String): Object {
		const publicKey = `-----BEGIN RSA PUBLIC KEY-----
	MEgCQQCutrtOSfd+LgblRuKgK7tZNM8u+Pwjjp5Yg42wSjFluiFGvydWyX3v/z+B
	WcBMTwy/yE0on7JbGp0m+2AgdAKzAgMBAAE=
	-----END RSA PUBLIC KEY-----`;
		const key = new NodeRSA(publicKey);
		return JSON.parse(key.decryptPublic(data, 'utf8'));
	}
}
