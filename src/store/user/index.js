import { observable, action } from 'mobx';

class UserStore {
	@observable userInfo = {}

	@action login(user) {
		this.userInfo = {isLogin: true, ...user};
		localStorage.userInfo = JSON.stringify(this.userInfo);
	}

	@action logout() {
		this.userInfo = {};
		localStorage.removeItem('userInfo');
	}
}
export default UserStore;
