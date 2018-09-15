import { Component } from '@angular/core';
import { GoalsService } from '../../services/goals/goals.service';
import { ProgramsService } from '../../services/programs/programs.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import * as $ from 'jquery';
import { ProjectsService } from '../../services/projects/projects.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent{

	goals: any;
	programs: any;
	analytics: any = {};
	analytic: any = {"LEN":0};
	Math: any;
	token: any;
	projects: any;
	wtSum = 0;
	qwtSum = 0;
	pwtSum = 0;
	cwtSum = 0;
	projs: any;

	constructor(private goalsService: GoalsService, private programsService: ProgramsService,
		private projectsService: ProjectsService, private analyticsService: AnalyticsService) {
		this.Math = Math;
		this.token = localStorage.getItem("token");
		if (this.token) {
			this.getGoals();
			this.getPrograms();
			this.getProjects();
			this.state()
		}
		
	}
 
	getGoals(){
		this.goalsService.goals(this.token).then((resp)=>{
			$.each(resp, (index, value)=>{
				value['name'] = value['name'].replace(/\d+./, '');
			});
			this.goals = resp;
		}).catch(err=>{
			console.log("err", err)
		})
	}
	getPrograms(){
		this.programsService.programs(this.token).then((res)=>{
			this.programs = res;
			this.programs.reduce((wtTotal = 0, prog)=> {
				this.wtSum+=(parseFloat(prog.wt)/100);
				this.pwtSum+=((parseFloat(prog.wt)/100) * (parseFloat(prog.passed)/100));
				this.qwtSum+=((parseFloat(prog.wt)/100) * (parseFloat(prog.quality)/100));
				this.cwtSum+=((parseFloat(prog.wt)/100) * (parseFloat(prog.completed)/100));
			})
			this.analytics['planPass'] = ((this.pwtSum*100) / this.wtSum);
			this.analytics['WT'] = ((this.cwtSum*100) / this.wtSum);
			this.analytics['QA'] = ((this.qwtSum*100) / this.wtSum);
			this.analytics['prglen'] = this.programs.length;
		}).catch(err=>{
			console.log("err", err)
		});
	}

	getProjects(){
		this.projectsService.projects(this.token).then(resp=>{
			this.projs = resp
			this.projs = this.projs.filter(proj => proj.status == 4 ? proj : null)
			this.analytics['prjlen'] = this.projs.length;
		}).catch(err=>{
			console.log(err);
		})
	}

	// getAnalytics(){
	// 	this.analyticsService.planAnalytics('analytics', this.token).then((res)=>{
	// 		console.log("res", res)
	// 		this.analytics = res; 
	// 	}).catch(err=>{
	// 		console.log("err", err)
	// 	});		
	// }

	state(){
		this.programsService.programs(this.token).then(programs=>{
			let STP = 0 , ONT = 0, LTE = 0;
			$.each(programs, (i, program)=>{
				this.programsService.projectsOfProgram(program._id, this.token).then(projects =>{
					this.projects = this.programsService.myFilter(projects);
					this.analytic["LEN"] += this.projects.length;
					$.each(this.projects, (i, proj)=>{
						if (proj.status == 3) {
							STP += 1;
						}else if (proj.status == 4) {
							ONT += 1;
						}else if (proj.status == 5) {
							LTE += 1;
						}
					});
					this.analytic["LTE"] = LTE;
					this.analytic["STP"] = STP;
					this.analytic["ONT"] = ONT;
				})
			})
		})
	}

}
