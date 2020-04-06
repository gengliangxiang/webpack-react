import HomeStore from './home/index';
import MenuStore from './menu/index';

const menuStore = new MenuStore();
const homeStore = new HomeStore();

const stores = {
	menuStore,
	homeStore,
};
// 默认导出接口
export default stores;
