import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ChangePasswordResponse } from 'src/models/ChangePasswordResponse';
import { UserDataService } from 'src/services/UserDataService';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  loading = false;
  successMsg='';
  error='';
  old_pass_error='';
  pass_error='';
  response:ChangePasswordResponse;
  form = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });
  constructor(private userService: UserDataService) { }

  ngOnInit() {
  }
  submit(){
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
  }
  this.error='';
  console.log("newPassword = "+this.form.get(["newPassword"])!.value)
  console.log("confirm Password = "+this.form.get(["confirmPassword"])!.value)
  if(this.form.get(["newPassword"])!.value != this.form.get(["confirmPassword"])!.value){
    console.log("");
    this.pass_error="New Password does not match!..";
    return;
  }
  this.pass_error='';
  this.loading = true;
  let oldPass = this.form.get(["oldPassword"])!.value;
  let newPass=this.form.get(["newPassword"])!.value;
  this.userService.changePassword(oldPass,newPass).pipe(map(user => {
    this.loading = false;
    this.response = user;
    if(this.response.status=="OK"){
      this.successMsg = this.response.message;
    }
    else{
      this.error=this.response.message;
    }
})).subscribe(
  res => {

  },
  error => {
    this.error = "(The system cannot update)";
    this.loading = false;
  });

}
  }

