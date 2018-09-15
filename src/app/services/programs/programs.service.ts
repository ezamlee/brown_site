import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { ApiService } from '../api/api.service';

@Injectable()
export class ProgramsService {
	// token: any;
	constructor(private api: ApiService) {
	}

	programs(token){
		// return this.api.post('program/list');
		return new Promise((resolve, reject)=>{

			var settings = {
				"async": true,
				"crossDomain": true,
				"url": `${this.api.url}/program/list?token=${token}`,
				"method": "POST"
			}

			$.ajax(settings).done(response=> {
				resolve(response);
			}).fail(error=>{
				reject(error);
			});
		})
	}

	getProgram(id, token){
		// return this.api.get('program/'+id);
		return new Promise((resolve, reject)=>{

			var settings = {
				"async": true,
				"crossDomain": true,
				"url": `${this.api.url}/program/${id}?token=${token}`,
				"method": "GET"
			}

			$.ajax(settings).done(response=> {
				resolve(response);
			}).fail(error=>{
				reject(error);
			});
		})
	}

	projectsOfProgram(id, token){
		return new Promise((resolve, reject)=>{
			var settings = {
					"async": true,
					"crossDomain": true,
					"url": `${this.api.url}/project/list?token=${token}`,
					"method": "POST",
					"headers": {
					"content-type": "application/json"
				},
				"processData": false,
				"data": `{\"program\": \"${id}\"}`
			}

			$.ajax(settings).done((response)=>{
				resolve(response);
			}).catch(error=>{
				reject(error);
			});
		})
	}

	myFilter(objs){
	    return objs.map((obj)=>{
	      return (({ _id, status}) => ({ _id, status}))(obj)
	    })
	}
}
