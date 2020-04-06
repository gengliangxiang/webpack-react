import { observable, action } from 'mobx';

class MenuStore {
	@observable bg = '1';

	@observable bg2 = '2';

	@action changeSidebar(type) {
		this.bg = type;
	}
}
export default MenuStore;
