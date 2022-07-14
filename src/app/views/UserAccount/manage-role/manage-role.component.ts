import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuItem } from 'src/models/menuItem';
import { MenuService } from 'src/services/MenuService';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.scss']
})
export class ManageRoleComponent implements OnInit {
  loading = false;
  error='';
  message='';
  role_id:string;
  role_list:string[];
  checkedList=[];
  menuList:MenuItem[];

  form = new FormGroup({
    role_id: new FormControl('')
  });
  constructor(private menu_service:MenuService) { 

  }

  ngOnInit() {
   /* this.loading = true;
    this.menu_service.getallrolelistData().subscribe((res: string[]) => {
      this.loading = false;
      this.role_list = res;
    },
    error => {
      this.error ="The system have the error";
      this.loading = false;
    });*/
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
    this.message=''
      this.checkedList=[];
      this.menuList=[];
      if (this.form.invalid) {
        this.error = "Data is required";
        return;
    }
    this.error="";
    
    this.role_id = this.form.get(["role_id"])!.value;
    this.loading = true;
    //console.log("Param = "+this.user_id)
    this.menu_service.getAccessMenuData(this.role_id).subscribe((res:MenuItem[])=>{
      this.loading = false;
      if(res){
        this.menuList = res;
        this.menuList.forEach(e =>{
          if(e.selected)this.checkedList.push(e.menu_id);
        })
      }
      else{
        this.error = "User doesn't exist!..";
      }
    },(error) => {
      this.menuList=null;
      this.loading = false;
      this.error="Internal Server Error";
      console.log(error);
    });
  }
  onPermit(){
    this.loading=true;
    this.message=''
    this.menu_service.PermitMenuToRole(this.role_id,this.checkedList).subscribe((res:boolean)=>{
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
}
