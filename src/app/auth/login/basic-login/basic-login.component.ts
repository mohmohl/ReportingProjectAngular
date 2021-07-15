import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { AppUserResponse } from 'src/models/AppUserResponse';
import { User } from 'src/models/User';
import { AuthenticationService } from 'src/services/AuthenticationService';
import { UserDataService } from 'src/services/UserDataService';
import { isNumber } from 'util';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {
  loading = false;
  mobileLoginFlag=false;
  submitted = false;
  returnUrl: string;
  error = '';
  mobileLogin_OTP:string;
  userId:string;
  username:string;
  user_password:string;
  currentUser: User;
  response:AppUserResponse;
  form = new FormGroup({
    userId: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  constructor(private route: ActivatedRoute,private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserDataService
    ) { }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    const currentUser = this.authenticationService.currentUserValue;
    if(currentUser){
    this.router.navigate([this.returnUrl]);
    }
  }
check_isNumber(n:string) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 

  onChange(event: any){
    let value = event.target.value;
    this.loading = true;
    this.error="";
    if(!isNaN(value) && this.check_isNumber(value)){
      if(value.slice(0, 2) ==="09"){
        this.mobileLoginFlag=true;
        this.userService.getMobileLoginUserData(value).pipe(map(user => {
          this.loading = false;
          this.response = user;
          if(this.response.status=="OK"){
            this.mobileLogin_OTP = this.response.message;
            console.log("OTP >>> "+this.mobileLogin_OTP);
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
    else{

      
      this.mobileLoginFlag=false;
      this.loading = false;
    }
  }
  submit(){
     if (this.form.invalid) {
      this.error = "User Name and Password are required";
      return;
  }
  this.error="";
  this.userId = this.form.get(["userId"])!.value;
  this.user_password= this.form.get(["password"])!.value;
  this.loading = true;
  if(this.mobileLoginFlag){
    if(this.user_password === this.mobileLogin_OTP){
      console.log("Login Success")
    }
    else{
      this.loading = false;
      this.error="Your Password doesn't match!...";
      return;
    }
  
  }
 this.authenticationService.login(this.userId,this.user_password)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                  console.log("login error= "+error)
                    this.error = error;
                    this.loading = false;
                });

   
      
    }
}

