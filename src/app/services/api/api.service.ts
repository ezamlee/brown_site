import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ApiService {

	url: string = 'http://35.231.113.71:8001/api';
	//url: string = 'http://localhost:8001/api';

	constructor(public http: HttpClient) {}

	// get(endpoint: string) {

	// 	return this.http.get(this.url + '/' + endpoint);
	// }

	// post(endpoint: string,  body?: any, reqOpts?: any) {

 //    	return this.http.post(this.url + '/' + endpoint, body, reqOpts);
	// }

}
