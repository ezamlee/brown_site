import { Component } from '@angular/core';

import { ProjectsService } from '../../services/projects/projects.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent{
	id: any;
	projects: any;
	activeProject :any = {};
	analytics: any;
	token: any;

	constructor(private projectsService: ProjectsService, private analyticsService: AnalyticsService,
				private usersService: UsersService) {
		this.token = localStorage.getItem("token") || `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Mjc4MDMzNTEsImRhdGEiOiJ7XCJfaWRcIjpcImFhXCIsXCJuYW1lXCI6XCLYry4g2YXYrdmF2K8g2KjZhiDYo9it2YXYryDYp9mE2K7YttmK2LHZilwiLFwidGl0bGVcIjpcItin2YTYrti22YrYsdmKXCIsXCJwb3NpdGlvblwiOlwi2LnZhdmK2K8g2KfZhNmD2YTZitipXCIsXCJtb2JpbGVcIjpcIjA1MDQzNjY5NzVcIixcIndoYXRzYXBwXCI6XCIwNTA0MzY2OTc1XCIsXCJ0ZWxlcGhvbmVcIjpcIlwiLFwiZW1haWwxXCI6XCJtMDUwNDM2Njk3NUBnbWFpbC5jb21cIixcImVtYWlsMlwiOlwiXCIsXCJyb2xlXCI6XCJhZG1pblwiLFwiZW50aXR5bDFcIjpcIjE1MTEzMDg3NDY0NjVcIixcImVudGl0eWwyXCI6XCJFMVwiLFwiZW50aXR5bDNcIjpcIjE1MTEzOTI4NDI3NDJcIixcImVudGl0eWw0XCI6XCJcIixcInVzZXJuYW1lXCI6XCJ1c2VyMVwiLFwicGFzc3dvcmRcIjpcIjEyMzRcIixcImFjY2Vzc1wiOntcImVudGl0eVwiOnRydWUsXCJ0YXNrXCI6dHJ1ZSxcInByb2plY3RcIjp0cnVlLFwicHJvZ3JhbVwiOnRydWUsXCJnb2FsXCI6dHJ1ZSxcInVzZXJcIjp0cnVlLFwidG90YWxcIjp0cnVlLFwiaW50cm9cIjp0cnVlLFwicmVwb3J0XCI6dHJ1ZSxcImFuYWx5dGljc1wiOnRydWV9LFwiYXV0aFRhc2tcIjoxNSxcImF1dGhQcm9qZWN0XCI6MTUsXCJhdXRoUHJvZ3JhbVwiOjQsXCJhdXRoR29hbHNcIjoxMixcImF1dGhVc2Vyc1wiOjIsXCJhdXRoRW50aXRpZXNcIjowfSIsImlhdCI6MTUyNzcxNjk1MX0.UoJmfh2EyL-JPvxxuSHq0f6HsUTAW7-rPrVtdWBcmhQ`;
		if (this.token) {
			this.getData('1514490491256')
			this.getProjects();
		}
	}

	getProjects(){
		this.projectsService.projects(this.token).then((resp)=>{
			this.projects = resp;
		}).catch(err=>{
			console.log(err);
		})
	}

	getData(id){
		this.projectsService.getProject(id, this.token).then((res)=>{

			if (res['datePlannedStart'] != 'NaN-NaN-NaN' && res['datePlannedEnd'] != 'NaN-NaN-NaN' ) {
				var period = this.monthDiff(res['datePlannedStart'] , res['datePlannedEnd']);
				// res['prgPeriod'] = this.monthDiff(res['dateActualStart'] , res['dateActualEnd']) + "شهر ";
				if (period['days'] > 0 || period['months'] > 0) {
					if(period['months'] || period['months'] != 0){
						res['prgPeriod'] = period['months'] + " شهر  "
					}
					if(period['days'] || period['days'] != 0){
						if(res['prgPeriod']) res['prgPeriod'] += period['days'] + " يوم ";
						else res['prgPeriod'] = period['days'] + " أيام/يوم ";

					}
				}
			}
			else{
				res['prgPeriod'] = 'غير متاح';
			}

			if (res['dateActualStart'] == 'NaN-NaN-NaN') {
				res['dateActualStart'] = 'غير متاح'
			}
			if (res['dateActualEnd'] == 'NaN-NaN-NaN') {
				res['dateActualEnd'] = 'غير متاح'
			}
			if (res['datePlannedStart'] == 'NaN-NaN-NaN') {
				res['datePlannedStart'] = 'غير متاح'
			}
			if (res['datePlannedEnd'] == 'NaN-NaN-NaN') {
				res['datePlannedEnd'] = 'غير متاح'
			}

			if (res['manager']) {
				this.usersService.getUser(res['manager'], this.token).then(user=>{
					res['manager'] = user['name']
				})
			}else{
				res['manager'] = "غير محدد"
			}

			this.activeProject = res;
			this.getAnalytics(id);

		}).catch(err=>{
			console.log("error", err)
		})
	}
	getAnalytics(id){
		this.analyticsService.planAnalytics('analytics/project/'+id, this.token).then((res)=>{
			res['completed'] = this.activeProject.completed;
			res['quality'] = this.activeProject.quality;
			res['status'] = this.activeProject.status;
			res['passed'] = this.activeProject.passed || -1;
			this.analytics = res;
		}).catch(err=>{
			console.log("error", err)
		})
	}

	monthDiff(d1, d2) {
		d1 = new Date(d1);
		d2 = new Date(d2);
	    var months;
	    var days;

	    months = (d2.getFullYear() - d1.getFullYear()) * 12;
	    months -= d1.getMonth() + 1;
	    months += d2.getMonth() +1;

	    days = d2.getDate();
	    days -= d1.getDate();

	    var diff = {
	    	"months": months,
	    	"days": days
	    }
	    return diff
	    // return months <= 0 ? 0 : months;
	}
}
