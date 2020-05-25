import axios from 'axios';
import NodeRSA from 'node-rsa';

// 默认配置
const config = {
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
	timeout: 1000 * 20,
};

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAK62u05J934uBuVG4qAru1k0zy74/COOnliDjbBKMWW6IUa/J1bJ
fe//P4FZwExPDL/ITSifslsanSb7YCB0ArMCAwEAAQJAO9SR4iaMXaaPb/bNZwJy
3wKprLFRTy/o4/DxFZziu63maZVRfnCnekr3m6YjByxF3Oc0TyUX/uWXmxMzkgM1
8QIhAPZvruMaI5Igpp7heh9RupWgWT4/gWIOTgB8PS8yXJdbAiEAtX5+aJTR7dRc
LRFfdKkNkc/5YnL5kjgilA8IWZeneYkCIQDcFKF6770Uo1QqT/NgRPz841bP4KcL
ivreNBXwMGnAQQIgXDgN2u3jTUkeHPg63HgZoQFf4hoxnY5QY5LP11YrjqECIACP
gzW6lklMd4zVF+Sz3WrN/cRbP1Z8U2iPvaMVruj8
-----END RSA PRIVATE KEY-----`;
const key = new NodeRSA(privateKey);

const instance = axios.create(config);

// 请求拦截器
instance.interceptors.request.use(
	requestConfig => {
		const { data } = requestConfig;
		console.log(data);
		requestConfig.data = {
			data: key.encryptPrivate(JSON.stringify(data), 'base64'),
		};
		return requestConfig;
	},
	error => Promise.reject(error),
);

// 响应拦截器
instance.interceptors.response.use(
	response => response.data,
	error => {
		if (!axios.isCancel(error)) {
			let msg = '网络错误！';
			if (error instanceof Error) {
				msg = error.message;
			}
			alert.error(msg);
		}
		return Promise.reject(error);
	},
);

export default instance;
