import { Component } from '@angular/core';
import { GlobalService } from '../../services/global/global.service';
import { GoalsService } from '../../services/goals/goals.service';
import { ProgramsService } from '../../services/programs/programs.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
	programs: any;
	goals: any;
	vision: any;
	message: any;
	token: any;

	constructor(private programsService: ProgramsService,
				private goalsService: GoalsService,
				private globalService: GlobalService) {

		this.token = localStorage.getItem("token");
		if (this.token) {
			this.getContant();
		}
	}

	getContant(){
		this.programsService.programs(this.token).then((res)=>{
			console.log("res slider", res)
			this.programs = res;
		}).catch(error=>{
			console.log("error", error)
		});

		this.goalsService.goals(this.token).then((res)=>{
			$.each(res, (index, value)=>{
				value['name'] = value['name'].replace(/\d+./, '');
			});
			this.goals = res;
		}).catch(error=>{
			console.log(error)
		});
		
		this.globalService.global(this.token).then(resp=>{
			this.message = resp[0].data.message;
			this.vision = resp[0].data.vision;
		}).catch(error=>{
			console.log("error", error)
		})
	}
}
