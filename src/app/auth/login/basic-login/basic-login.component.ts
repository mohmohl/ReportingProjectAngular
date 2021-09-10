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
  changePasswordMode = false;
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
    password: new FormControl({value: '',disabled: true}, Validators.required)
  });
  constructor(private route: ActivatedRoute,private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserDataService
    ) { }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    const currentUser = this.authenticationService.currentUserValue;
    //console.log("login >>"+currentUser);
    if(currentUser){
    this.router.navigate([this.returnUrl]);
    }
    
  }
  togglePassword(){
  var x = document.getElementById("p_box");
  if ( x.getAttribute('type')  === "password") {
    x.setAttribute('type', "text");
  } else {
    x.setAttribute('type', "password");
  }
}
check_isNumber(n:string) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 

  onChange(event: any){
    this.form.get(["password"])!.disable();
    
    var value = event.target.value;
    this.error="";
    if(value != ""){
      this.loading = true;
    if(!isNaN(value) && this.check_isNumber(value)){
      if(value.slice(0, 2) ==="09"){
        this.mobileLoginFlag=true;
        this.userService.getMobileLoginUserData(value).pipe(map(user => {
          this.loading = false;
          this.response = user;
          if(this.response.status=="OK"){
            this.mobileLogin_OTP = this.response.message;
            this.error="User ID Registered Please Proceed...";
            this.form.get(["password"])!.enable();
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
      else{
        this.loading = false;
        this.error = "UserID doesn't exist!..";
      }

    }
    else{
      value=value.toUpperCase();
      event.target.value = value.toUpperCase();
      this.userService.checkUserForRegistration(value).pipe(map(user => {
        this.loading = false;
        this.response = user;
        if(this.response.status=="OK"){
         this.changePasswordMode = true;
          this.mobileLoginFlag=true;
          this.mobileLogin_OTP = this.response.message;
          this.error="Register Successful!..Please proceed!..";
          this.form.get(["password"])!.enable();
         
          
        }
        else if(this.response.status=="Registed"){
          this.error=this.response.message;
          this.form.get(["password"])!.enable();
        }
        else{
          this.error=this.response.message;
          this.mobileLoginFlag=false;
         
        }
    })).subscribe(
      res => {
    
      },
      error => {
        console.log("login onchange >> "+error)
        this.error = "(System have the error!..)";
        this.loading = false;
      });
      
      
    }
  }
  }
  submit(){
     if (this.form.invalid) {
      this.error = "User ID and Password are required";
      return;
  }
  this.error="";
  this.userId = this.form.get(["userId"])!.value.toUpperCase();;
  this.user_password= this.form.get(["password"])!.value;
  this.loading = true;
  if(this.mobileLoginFlag){
    if(this.user_password === this.mobileLogin_OTP){
      console.log("Login Success")
    }
    else{
      this.loading = false;
      this.error="Password doesn't match!...";
      return;
    }
  
  }
 this.authenticationService.login(this.userId,this.user_password)
            .pipe(first())
            .subscribe(
                data => {
                if( this.changePasswordMode){this.router.navigate(["/change-password"]);}
                else{
                    this.router.navigate([this.returnUrl]);}
                },
                error => {
                  console.log("login error= "+error)
                    this.error = "User ID and Password doesn't match!.";
                    this.loading = false;
                });

   
      
    }
}

