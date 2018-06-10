import Request from './request';

export default class OpeningService extends Request{
	static list(){
		return Request.get('/openings');
	}

	static get(id){
		return Request.get('/openings/' + id);
	}

	static create(data){
		return Request.post('/openings', data);
	}

	static update(id, data){
		return Request.put('/openings/' + id , data);
	}

	static delete(id){
		return Request.delete('/openings/' + id);
	}
	
}