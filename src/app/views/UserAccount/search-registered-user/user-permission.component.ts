import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'src/models/menuItem';
import { UserInfo } from 'src/models/UserInfo';
import { MenuService } from 'src/services/MenuService';
import { UserDataService } from 'src/services/UserDataService';

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.css']
})
export class UserPermissionComponent implements OnInit {
  error='';
  message='';
  user_id : string;
  loading = false;
  menuList:MenuItem[];
  checkedList=[];
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
  submit(){
    this.checkedList=[];
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
  }
  this.error="";
  this.user_id = this.form.get(["userId"])!.value;
  this.loading = true;
  //console.log("Param = "+this.user_id)
  this.service.getRegisteredUserData(this.user_id).subscribe((res:UserInfo)=>{
    this.loading = false;
    this.data = res;
    this.data.menuItem.forEach(e =>{
      if(e.selected)this.checkedList.push(e.menu_id);
    })
  },(error) => {
    this.data=null;
    this.loading = false;
    this.error="Internal Server Error";
    console.log(error);
  });
}

onPermit(){
  this.loading=true;
  this.service.PermitMenuToApplicationAccount(this.user_id,this.checkedList).subscribe((res:boolean)=>{
    this.loading = false;
    if(res){
      this.message="Successful Permit";
    }else{
      this.message="Not Successful Permit";
    }
   
  },(error) => {
   
    this.loading = false;
    this.error="Internal Server Error";
    console.log(error);
  });
}


}