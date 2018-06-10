import Request from './request';

export default class AuthService extends Request{
	static register(credentials){
		return Request.post('/user/register', credentials);
	}

	static login(credentials){
		return Request.post('/user/login', credentials);
	}

	static auth(){
		return Request.post('/user/auth', {});
	}
	
}