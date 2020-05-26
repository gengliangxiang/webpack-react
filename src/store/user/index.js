import { observable, action } from 'mobx';

class UserStore {
	@observable isLogin = JSON.parse(localStorage.reactLogin) || false;

	@observable userName = JSON.parse(localStorage.userName) || '管理员';

	@action login(user) {
		this.isLogin = true;
		this.userName = user;
		localStorage.reactLogin = JSON.stringify(true);
		localStorage.userName = JSON.stringify(user);
	}

	@action logout() {
		this.isLogin = false;
		this.userName = null;
		localStorage.removeItem('reactLogin');
		localStorage.removeItem('userName');
	}
}
export default UserStore;
