import HomeStore from './home/index';
import MenuStore from './menu/index';
import UserStore from './user/index';

const menuStore = new MenuStore();
const homeStore = new HomeStore();
const userStore = new UserStore();


userStore.userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : {};
const stores = {
	menuStore,
	homeStore,
	userStore,
};
// 默认导出接口
export default stores;
