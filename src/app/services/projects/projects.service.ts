import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { ApiService } from '../api/api.service';

@Injectable()
export class ProjectsService {
	constructor(private api: ApiService) {}

	projects(token){
		return new Promise((resolve, reject)=>{

			var settings = {
				"async": true,
				"crossDomain": true,
				"url": `${this.api.url}/project/list?token=${token}`,
				"method": "POST",
				"headers": {
				"Cache-Control": "no-cache",
				"Postman-Token": "011e4224-ddb7-fefc-fc4f-dfaf5bdb3b61"
				}
			}

			$.ajax(settings).done(response=> {
				resolve(response);
			}).fail(error=>{
				reject(error);
			});
		})
	}

	getProject(id, token){
		return new Promise((resolve, reject)=>{

			var settings = {
				"async": true,
				"crossDomain": true,
				"url": `${this.api.url}/project/${id}?token=${token}`,
				"method": "GET",
				"headers": {
				"Cache-Control": "no-cache",
				"Postman-Token": "011e4224-ddb7-fefc-fc4f-dfaf5bdb3b61"
				}
			}

			$.ajax(settings).done(response=> {
				resolve(response);
			}).fail(error=>{
				reject(error);
			});
		})
	}

}
