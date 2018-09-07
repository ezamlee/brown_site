import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent {
	
	@Input() state : any;
	Math: any;
	
	constructor() {
	    this.Math = Math; 
	}
}
