import axios from 'axios';
// import {ORIGIN} from './requestAddress';

// const baseURL = `${ORIGIN}api`;

const config = {
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json;charset=uf-8;',
	},
	timeout: 3000,
};
const instance = axios.create(config);
// http request 拦截器
instance.interceptors.request.use(
	params => params,
	err => Promise.reject(err),
);

// http response 拦截器
instance.interceptors.response.use(
	response => response.data,
	error => Promise.reject(error),
);
// console.log(baseURL);

export default instance;
