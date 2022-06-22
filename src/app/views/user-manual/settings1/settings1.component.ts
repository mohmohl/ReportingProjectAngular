import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManualFileDir } from 'src/models/userManual/ManualFileDir';
import { UserManualService } from 'src/services/UserManualService';

@Component({
  selector: 'app-settings1',
  templateUrl: './settings1.component.html',
  styleUrls: ['./settings1.component.css']
})
export class Settings1Component implements OnInit {
  error='';
  message='';
  loading = false;

  form = new FormGroup({
    type: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    path: new FormControl('',Validators.required),
    fileType: new FormControl('',Validators.required),
  });

  constructor(private service:UserManualService) { }

  ngOnInit() {
  }

  submit(){
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
  }
  this.error="";
  this.loading = true;

  const directory = new ManualFileDir();
  directory.description = this.form.get(["description"])!.value
  directory.fullPath = this.form.get(["path"])!.value
  directory.manualType = this.form.get(["fileType"])!.value
  directory.type = this.form.get(["type"])!.value

  this.service.saveUserManual(directory).subscribe(res =>{
      this.loading = false;
      if(res){
      this.message = "Saved Successful!..."
      this.clear();
      }
      else{
        this.error="Saved Fail"
      }
  });
}

clear() {
  this.form = new FormGroup({
    type: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    path: new FormControl('',Validators.required),
    fileType: new FormControl('',Validators.required),
  });
}

}
