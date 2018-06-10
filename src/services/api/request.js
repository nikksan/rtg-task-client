const API_URL = process.env.REACT_APP_API_URL;

export default class Request {
	static async get(endpoint){
		return Request.doFetch(endpoint);
	}

	static async post(endpoint, body){
		return Request.doFetch(endpoint, {
			headers: Request.getHeaders(),
			method: 'POST',
   	 		body: JSON.stringify(body),
   	 		credentials: 'include'
		});
	}

	static async put(endpoint, body){
		return Request.doFetch(endpoint, {
			headers: Request.getHeaders(),
			method: 'PUT',
   	 		body: JSON.stringify(body),
   	 		credentials: 'include'
		});
	}

	static async delete(endpoint){
		return Request.doFetch(endpoint, {
			headers: Request.getHeaders(),
			method: 'DELETE',
			credentials: 'include'
		});
	}

	static async upload(endpoint, file, key = 'file'){
		const formData = new FormData();
  		formData.append(key, file);

		return Request.doFetch(endpoint, {
			method: 'POST',
   	 		body: formData,
   	 		credentials: 'include'
		});
	}
	
	static getHeaders(){
		let headers = {
			'content-type': 'application/json'
		};
		return headers;
	}

	static async doFetch(endpoint, fetchOpts){
		const response = await fetch(API_URL + endpoint, fetchOpts);
		const json = await response.json();
		
		if(json.error){
			throw new Error(json.error);
		}
		return json.data;
	}
}