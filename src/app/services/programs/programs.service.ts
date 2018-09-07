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

	getProgram(id, token){
		// return this.api.get('program/'+id);
		return new Promise((resolve, reject)=>{

			var settings = {
				"async": true,
				"crossDomain": true,
				"url": `${this.api.url}/program/${id}?token=${token}`,
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

	projectsOfProgram(id, token){
		return new Promise((resolve, reject)=>{
			var settings = {
					"async": true,
					"crossDomain": true,
					"url": `${this.api.url}/project/list?token=${token}`,
					"method": "POST",
					"headers": {
					"content-type": "application/json",
					"cache-control": "no-cache",
					"postman-token": "29e34188-41c2-39de-6e02-c4a7590d46f2",
        			"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
					"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Key",
					"Access-Control-Allow-Origin":"*",
					"Allow-Control-Allow-Origin":"*"
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
