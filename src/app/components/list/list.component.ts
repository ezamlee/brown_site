import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent{
	@Input() list : any;
	@Output() change = new EventEmitter();

	id:any;

	constructor() {}

	dataChange(id){
		this.id = id;
		this.change.emit(id)
	}
	isActive(id) {
    	return this.id === id;
  	};
}
