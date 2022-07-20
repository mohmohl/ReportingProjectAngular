import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'src/models/menuItem';
import { UserInfo } from 'src/models/UserInfo';
import { UserDataService } from 'src/services/UserDataService';

@Component({
  selector: 'app-user-branch-setup',
  templateUrl: './user-branch-setup.component.html',
  styleUrls: ['./user-branch-setup.component.css']
})

export class UserBranchSetupComponent implements OnInit {

  error='';
  message='';
  user_id : string;
  loading = false;
  menuList:MenuItem[];
  checkedList=[];
  rolecheckedList=[];
  data:UserInfo;
  form = new FormGroup({
    userId: new FormControl('', Validators.required)
  });
  
  constructor(private service:UserDataService) { 
  }
  ngOnInit() {
  }
  onChange(val: string, isChecked: boolean) {
    if (isChecked) {
      this.checkedList.push(val);
    } else {
      const index = this.checkedList.findIndex(x => x === val);
     this.checkedList = this.checkedList.filter(item => item !== val);
    }

  }
  role_onChange(val: string, isChecked: boolean) {
    if (isChecked) {
      this.rolecheckedList.push(val);
    } else {
      const index = this.rolecheckedList.findIndex(x => x === val);
     this.rolecheckedList = this.rolecheckedList.filter(item => item !== val);
    }

  }
  userIdOnChange(event: any){
    var value = event.target.value;
    value=value.toUpperCase();
    event.target.value = value.toUpperCase();
    }
  submit(){
    this.checkedList=[];
    this.rolecheckedList=[];
    
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
  }
  this.error="";
  this.user_id = this.form.get(["userId"])!.value.toUpperCase();
 
  this.loading = true;
  //console.log("Param = "+this.user_id)
  this.service.getRegisteredUserData(this.user_id).subscribe((res:UserInfo)=>{
    this.loading = false;
    debugger
    if(res){
      this.data = res;
      this.data.menuItem.forEach(e =>{
        if(e.selected)this.checkedList.push(e.menu_id);
      })
      this.data.roleList.forEach(e =>{
        if(e.selected)this.rolecheckedList.push(e.role_id);
      })
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

onPermit(){
  this.loading=true;
  this.message='';
  this.service.PermitMenuToApplicationAccount(this.user_id,this.checkedList).subscribe((res:boolean)=>{
    this.loading = false;
    if(res){
      this.message="Successful Permit";
    }else{
      this.message="Not Successful Permit";
    }
   
  },(error) => {
    this.message='';
    this.loading = false;
    this.error="Internal Server Error";
    console.log(error);
  });
}
rolePermit(){
  this.loading=true;
  this.message='';
  this.service.PermitRoleToApplicationAccount(this.user_id,this.rolecheckedList).subscribe((res:boolean)=>{
    this.loading = false;
    if(res){
      this.message="Successful Permit";
    }else{
      this.message="Not Successful Permit";
    }
   
  },(error) => {
    this.message='';
    this.loading = false;
    this.error="Internal Server Error";
    console.log(error);
  });
}
onUpdateStatus(userId: string, status: string) {
  debugger
  this.loading=true;
  this.message='';


  this.service.UpdateUserStatus(userId,status).subscribe((res:boolean)=>{
    this.loading = false;
    if(res){
      this.message="Successful Update User Status";
    }else{
      this.message="Not Successful Update User Status";
    }
   
  },(error) => {
    this.message='';
    this.loading = false;
    this.error="Internal Server Error";
    console.log(error);
  });

}

}




  


