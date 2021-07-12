import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/models/User';
import { AuthenticationService } from 'src/services/AuthenticationService';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  userId:string;
  username:string;
  user_password:string;
  currentUser: User;
  form = new FormGroup({
    userId: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  constructor(private route: ActivatedRoute,private router: Router,private authenticationService: AuthenticationService) { }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    const currentUser = this.authenticationService.currentUserValue;
    if(currentUser){
    this.router.navigate([this.returnUrl]);
    }
  }
  submit(){
     if (this.form.invalid) {
      this.error = "User Name and Password are required";
      return;
  }
  debugger;
  this.error="";
  this.userId = this.form.get(["userId"])!.value;
  this.user_password= this.form.get(["password"])!.value;
  this.loading = true;
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
