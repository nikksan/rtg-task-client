import Request from './request';

export default class UploadService extends Request{
	static image(file){
		return Request.upload('/upload/image', file, 'image');
	}
	
}