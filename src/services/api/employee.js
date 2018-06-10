import Request from './request';

export default class EmployeeService extends Request{
	static list(){
		return Request.get('/employees');
	}

	static get(id){
		return Request.get('/employees/' + id);
	}

	static create(data){
		return Request.post('/employees', data);
	}

	static update(id, data){
		return Request.put('/employees/' + id , data);
	}

	static delete(id){
		return Request.delete('/employees/' + id);
	}
	
}