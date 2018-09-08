import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { ApiService } from '../api/api.service';

@Injectable()
export class LoginService {
	
	url: string;

	constructor(private api: ApiService) {
		this.url = this.api.url;
	}

	login(username, password){
		return new Promise((resolve, reject)=>{
			
			var settings = {
				"async": true,
				"crossDomain": true,
				"url": `${this.url}/login?username=${username}&password=${password}`,
				"method": "POST",
			}

			$.ajax(settings).done(response=> {
				localStorage.setItem('token', response.token ? response.token:"");
					resolve(response)				
			}).fail(error=>{
				reject(error)
			});
		})
	}

}
