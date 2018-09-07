import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent implements OnInit {

  constructor(private loginSerivce: LoginService, private router: Router) {
  	
  }

  ngOnInit() {
  }

  login(){
  	this.loginSerivce.login("admin", 99845).then(data=>{
  		this.router.navigateByUrl('/plans');
  	}).catch(error=>{
  		console.log("error", error);
  	})
  }

}
