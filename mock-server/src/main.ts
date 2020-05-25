import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import isMockApi, { isMock, isAllMock } from './proxy/mock';
import config from './proxy/config';
import consoleStyle from './proxy/consoleStyle';
const proxy = require('http-proxy-middleware');
const cors = require('cors');

const commonProxy = proxy({
	target: config.devApiUrl,
	changeOrigin: true,
	autoRewrite: true,
});

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix(config.baseUrl);
	app.use(config.baseUrl, (req, res, next) => {
		if (isMockApi(req.url)) {
			console.log(consoleStyle.inverse, 'mock接口:' + req.url);
		} else {
			return commonProxy(req, res, next);
		}
		next();
	});
	app.use(cors());

	setTimeout(() => {
		if (isMock) {
			if (isAllMock) {
				console.log(consoleStyle.blue, '当前所有接口都在mock！');
				console.log(consoleStyle.blue, '当前所有接口都在mock！');
				console.log(consoleStyle.blue, '当前所有接口都在mock！');
			} else {
				console.log(consoleStyle.blue, `当前在部分接口mock！`);
				console.log(consoleStyle.blue, `当前在部分接口mock！`);
				console.log(consoleStyle.blue, `当前在部分接口mock！`);
			}
		} else {
			console.log(consoleStyle.magenta, `当前不在mock模式！`);
			console.log(consoleStyle.magenta, `当前不在mock模式！`);
			console.log(consoleStyle.magenta, `当前不在mock模式！`);
		}
	});
	await app.listen(8090);
}

bootstrap();
