import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuService } from 'src/services/MenuService';

@Component({
  selector: 'app-role-setup',
  templateUrl: './role-setup.component.html',
  styleUrls: ['./role-setup.component.css']
})
export class RoleSetupComponent implements OnInit {
  loading = false;
  error='';
  message='';
  role_id:string;
  saveform = new FormGroup({
    cust_role_id: new FormControl('')
  });
  constructor(private menu_service:MenuService) { }

  ngOnInit() {
  }
  save_role(){
    if (this.saveform.invalid) {
      this.error = "Data is required";
      return;
  }
  this.error="";
  this.message="";
  this.role_id = this.saveform.get(["cust_role_id"])!.value;
  this.loading = true;
  this.menu_service.save_custom_role(this.role_id).subscribe((res:boolean)=>{
    this.loading = false;
    debugger
    if(res){
      this.message="Successful Save!...."
    }
    else{
      this.error = "Role already't exist!..";
    }
  },(error) => {
   
    this.loading = false;
    this.error="Internal Server Error";
    console.log(error);
  });
  }
}
