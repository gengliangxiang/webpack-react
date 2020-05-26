import { observable, action } from 'mobx';

class UserStore {
	@observable isLogin = false;

	@action changeLogin(type) {
		this.isLogin = type;
	}
}
export default UserStore;
