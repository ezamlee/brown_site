import { Component } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';

import { ProgramsService } from '../../services/programs/programs.service';
import { GoalsService } from '../../services/goals/goals.service';
import { UsersService } from '../../services/users/users.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent {
	id: any;
	programs: any;
	activeProgram :any = {};
	analytics:any = {};
	token: any;
	projects: any ;

	constructor(private programsService: ProgramsService, private goalsService: GoalsService,
				private analyticsService: AnalyticsService, private route: ActivatedRoute,
				private usersService: UsersService) {

		this.route.params.subscribe(params => {
			this.token = localStorage.getItem("token") || `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Mjc4MDMzNTEsImRhdGEiOiJ7XCJfaWRcIjpcImFhXCIsXCJuYW1lXCI6XCLYry4g2YXYrdmF2K8g2KjZhiDYo9it2YXYryDYp9mE2K7YttmK2LHZilwiLFwidGl0bGVcIjpcItin2YTYrti22YrYsdmKXCIsXCJwb3NpdGlvblwiOlwi2LnZhdmK2K8g2KfZhNmD2YTZitipXCIsXCJtb2JpbGVcIjpcIjA1MDQzNjY5NzVcIixcIndoYXRzYXBwXCI6XCIwNTA0MzY2OTc1XCIsXCJ0ZWxlcGhvbmVcIjpcIlwiLFwiZW1haWwxXCI6XCJtMDUwNDM2Njk3NUBnbWFpbC5jb21cIixcImVtYWlsMlwiOlwiXCIsXCJyb2xlXCI6XCJhZG1pblwiLFwiZW50aXR5bDFcIjpcIjE1MTEzMDg3NDY0NjVcIixcImVudGl0eWwyXCI6XCJFMVwiLFwiZW50aXR5bDNcIjpcIjE1MTEzOTI4NDI3NDJcIixcImVudGl0eWw0XCI6XCJcIixcInVzZXJuYW1lXCI6XCJ1c2VyMVwiLFwicGFzc3dvcmRcIjpcIjEyMzRcIixcImFjY2Vzc1wiOntcImVudGl0eVwiOnRydWUsXCJ0YXNrXCI6dHJ1ZSxcInByb2plY3RcIjp0cnVlLFwicHJvZ3JhbVwiOnRydWUsXCJnb2FsXCI6dHJ1ZSxcInVzZXJcIjp0cnVlLFwidG90YWxcIjp0cnVlLFwiaW50cm9cIjp0cnVlLFwicmVwb3J0XCI6dHJ1ZSxcImFuYWx5dGljc1wiOnRydWV9LFwiYXV0aFRhc2tcIjoxNSxcImF1dGhQcm9qZWN0XCI6MTUsXCJhdXRoUHJvZ3JhbVwiOjQsXCJhdXRoR29hbHNcIjoxMixcImF1dGhVc2Vyc1wiOjIsXCJhdXRoRW50aXRpZXNcIjowfSIsImlhdCI6MTUyNzcxNjk1MX0.UoJmfh2EyL-JPvxxuSHq0f6HsUTAW7-rPrVtdWBcmhQ`;
      this.id = params['id'];
      if (this.id) {
      	this.getData(this.id);
      }
      else{
      		this.getData('1514489024091');
      }
   	});

		if (this.token) {
			this.getPrograms();
		}
	}

	ngOnInit() {

   }
	getPrograms(){
		this.programsService.programs(this.token).then((resp)=>{
			this.programs = resp;
		}).catch(err=>{
			console.log("err", err)
		})
	}
	getData(id){

		this.programsService.getProgram(id, this.token).then((data)=>{
			if (data['datePlannedStart'] != 'NaN-NaN-NaN' && data['datePlannedEnd'] != 'NaN-NaN-NaN' ) {
				var period = this.monthDiff(data['datePlannedStart'] , data['datePlannedEnd']);
				// data['prgPeriod'] = this.monthDiff(data['dateActualStart'] , data['dateActualEnd']) + "شهر ";
				if (period['days'] > 0 || period['months'] > 0) {
					if(period['months'] || period['months'] != 0){
						data['prgPeriod'] = period['months'] + " شهر  "
					}
					if(period['days'] || period['days'] != 0){
						if(data['prgPeriod']) data['prgPeriod'] += period['days'] + " يوم ";
						else data['prgPeriod'] = period['days'] + " أيام/يوم ";

					}
				}
			}
			else{
				data['prgPeriod'] = 'غير متاح';
			}

			if (data['dateActualStart'] == 'NaN-NaN-NaN') {
				data['dateActualStart'] = 'غير متاح'
			}
			if (data['dateActualEnd'] == 'NaN-NaN-NaN') {
				data['dateActualEnd'] = 'غير متاح'
			}
			if (data['datePlannedStart'] == 'NaN-NaN-NaN') {
				data['datePlannedStart'] = 'غير متاح'
			}
			if (data['datePlannedEnd'] == 'NaN-NaN-NaN') {
				data['datePlannedEnd'] = 'غير متاح'
			}
			$.each(data['goals'], (index, value)=>{
				this.goalsService.getGoal(value.l1, this.token).then((goal)=>{
					value.l1 = goal['name'].replace(/\d+./, '');
				}).catch(error=>{
					console.log("error", error)
				})
			})

			if (data['manager']) {
				this.usersService.getUser(data['manager'], this.token).then(user=>{
					data['manager'] = user['name']
				}).catch(error=>{
					console.log("error", error)
				})
			}else{
				data['manager'] = "غير محدد"
			}

			data['projects'] = []; 

			this.programsService.projectsOfProgram(id, this.token).then(response=>{
				$.each(response, (i, p)=>{
					data['projects'].push(p.name);
				});
				this.projects = this.programsService.myFilter(response);
				this.analytics["LEN"] = this.projects.length;
				let STP = 0 , ONT = 0, LTE = 0;
				$.each(this.projects, (i, proj)=>{
					if (proj.status == 3) {
						STP += 1;
					}else if (proj.status == 4) {
						ONT += 1;
					}else if (proj.status == 5) {
						LTE += 1;
					}
				});
				this.analytics["LTE"] = LTE;
				this.analytics["STP"] = STP;
				this.analytics["ONT"] = ONT;
				if (!data["passed"]) {
					this.analytics["passed"] = 0;
				}else{
					this.analytics["passed"] = data["passed"];
				}
				this.analytics["completed"] = data["completed"];
				this.analytics["quality"] = data["quality"];
				this.analytics["status"] = data["status"];

				this.activeProgram = data;
			}).catch(error=>{
				console.log("error", error)
			});

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
	    return diff;
	}
}
