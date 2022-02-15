import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInfo } from 'src/models/UserInfo';
import { UserDataService } from 'src/services/UserDataService';
import { map } from 'rxjs/operators';
import { AppUserResponse } from 'src/models/AppUserResponse';

@Component({
  selector: 'app-auth-forgot-password',
  templateUrl: './auth-forgot-password.component.html',
  styleUrls: ['./auth-forgot-password.component.css']
})
export class AuthForgotPasswordComponent implements OnInit {
  error='';
  message='';
  user_id : string;
  loading = false;
  data:UserInfo;
  response:AppUserResponse;
  form = new FormGroup({
    userId: new FormControl('', Validators.required)
  });

  passwordForm = new FormGroup({
    userId: new FormControl(''),
    userName: new FormControl(''),
  });

  constructor(private service:UserDataService) { }

  ngOnInit() {
  }

  submit(){
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
  }
  this.error="";
  this.message = "";
  this.data = null;
  this.user_id = this.form.get(["userId"])!.value;
  this.loading = true;
  //console.log("Param = "+this.user_id)
  this.service.getRegisteredUserData(this.user_id).subscribe((res:UserInfo)=>{
    this.loading = false;
    debugger
    if(res){
      this.data = res;   
      
      this.passwordForm = new FormGroup({
        userId: new FormControl(this.data.user_id),
        userName: new FormControl(this.data.user_name),
      });
    }
    else{
      this.error = "User doesn't exist!..";
    }
  },(error) => {
    this.data=null;
    this.loading = false;
    this.error="Internal Server Error";
    console.log(error);
  });
} 

reset(){
  this.loading = true;
  this.error="";
  
  this.service.forgotPassword(this.data.user_id).pipe(map(user => {
    this.loading = false;
    this.response = user;
      if(this.response.status=="OK"){
        this.error = "Password Reset Successful..Please Sign In"
        //this.router.navigate(["/auth/login"]);
      }
      else{
        this.error=this.response.message;
      }
    })).subscribe(
    res => {

    },
  error => {
    this.error = "(System have the error!..)";
    this.loading = false;
  });
}




}
