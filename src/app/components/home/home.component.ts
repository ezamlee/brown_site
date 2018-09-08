import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent implements OnInit {
  username: string;
  password: any;
  
  constructor(private loginSerivce: LoginService, private router: Router) {}

  ngOnInit() {
  }

  login(){
    this.loginSerivce.login(this.username, this.password)
    .then(data=>{
      console.log("data", data);
      if(data['user'] && data['user']['role'] == "admin"){
        this.router.navigateByUrl('/plans');
      }else{
        alert("Not Authorized")
      }
  	}).catch(error=>{
  		console.log("error", error);
  	})
  }

}
