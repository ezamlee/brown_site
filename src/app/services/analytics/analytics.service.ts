import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { ApiService } from '../api/api.service';

@Injectable()
export class AnalyticsService {
	constructor(private api: ApiService) {}

	planAnalytics(endPoint, token){
		return new Promise((resolve, reject)=>{
			console.log("url", `${this.api.url}/${endPoint}?token=${token}`);
			var settings = {
				"async": true,
				"crossDomain": true,
				"url": `${this.api.url}/${endPoint}?token=${token}`,
				"method": "GET"
			}

			$.ajax(settings).done(response=> {
				resolve(response);
			}).fail(error=>{
				reject(error);
			}); 
		})
	}
}
 