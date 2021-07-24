import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppUserResponse } from 'src/models/AppUserResponse';
import { UserDataService } from 'src/services/UserDataService';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  loading = false;
  error = '';
  userId:string;
  response:AppUserResponse;
  form = new FormGroup({
    userId: new FormControl('', Validators.required)
  });
  constructor(private router: Router,private userService: UserDataService) { }

  ngOnInit() {
  }
  submit(){
    if (this.form.invalid) {
     this.error = "User ID is required";
     return;
      }
    this.loading = true;
    this.error="";
    this.userId = this.form.get(["userId"])!.value;
  this.userService.forgotPassword(this.userId).pipe(map(user => {
      this.loading = false;
      this.response = user;
        if(this.response.status=="OK"){
          this.router.navigate(["/auth/login"]);
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
//end
}
