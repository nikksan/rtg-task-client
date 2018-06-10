import Request from './request';

export default class PageService extends Request{
	static list(){
		return Request.get('/pages');
	}

	static get(id){
		return Request.get('/pages/' + id);
	}

	static create(data){
		return Request.post('/pages', data);
	}

	static update(id, data){
		return Request.put('/pages/' + id , data);
	}

	static delete(id){
		return Request.delete('/pages/' + id);
	}
	
}