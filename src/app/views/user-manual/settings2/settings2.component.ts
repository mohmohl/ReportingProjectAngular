import { Component, OnInit } from '@angular/core';
import { UserManualService } from 'src/services/UserManualService';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManualRole } from 'src/models/userManual/ManualRole';

@Component({
  selector: 'app-settings2',
  templateUrl: './settings2.component.html',
  styleUrls: ['./settings2.component.css']
})
export class Settings2Component implements OnInit {
  error='';
  message='';
  loading = false;
  fileList: any=[];
  checkedList=[];

  form = new FormGroup({
    roleId: new FormControl('',Validators.required)
  });

  constructor(private service:UserManualService) { }

  ngOnInit() { }

  submit(){
  this.checkedList=[];
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
  }
  this.error="";
  var roleId = this.form.get(["roleId"])!.value;
  this.loading = true;
  this.service.getFileNameList(roleId).subscribe(res =>{
    this.loading = false;
    debugger
      if(res != null){
        this.fileList = res;
        this.fileList.forEach(e =>{
          if(e.selected)this.checkedList.push(e.id);
        })
      } else {
        this.error="This Role Id does not exist!...";
      }
    },(error) => {
      this.loading = false;
      this.error="Internal Server Error";
      console.log(error);
    });
}

  onChange(val: string, isChecked: boolean) {
    if (isChecked) {
      this.checkedList.push(val);
    } else {
      const index = this.checkedList.findIndex(x => x === val);
     this.checkedList = this.checkedList.filter(item => item !== val);
    }
  }

  permit(){
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
  }
  this.error="";
  this.loading = true;

  const role = new ManualRole();
  role.roleId = this.form.get(["roleId"])!.value
  role.fileId = this.checkedList

  this.service.saveUserManualRole(role).subscribe(res =>{
      this.loading = false;
      if(res){
      this.message = "Saved Successful!..."
      this.clear()
      }
      else{
        this.error="Saved Fail"
      }
  });
}

clear() {
  this.form = new FormGroup({
    roleId: new FormControl('',Validators.required)
  });
  this.checkedList = [];
}

}
