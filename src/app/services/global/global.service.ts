import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { ApiService } from '../api/api.service';

@Injectable()
export class GlobalService {

	constructor(private api: ApiService) {}

	global(token){
		return new Promise((resolve, reject)=>{

			var settings = {
				"async": true,
				"crossDomain": true,
				"url": `${this.api.url}/global/list?token=${token}`,
				"method": "POST"
			}

			$.ajax(settings).done(response=> {
				resolve(response);
			}).fail(error=>{
				reject(error);
			});
		})
	}
}
