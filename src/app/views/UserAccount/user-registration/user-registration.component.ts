import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'src/models/menuItem';
import { MenuService } from 'src/services/MenuService';
import { UserDataService } from 'src/services/UserDataService';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  paramId :string;
  loading = false;
  error='';
  successMsg=''
  pass_error='';
  checkedList=[];
  menuList:MenuItem[];
  form = new FormGroup({
    userId: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required)
  });  
  constructor(private userService: UserDataService,private route: ActivatedRoute,private menuService:MenuService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.paramId = params.get('userId');
})
this.form.setValue({
  userId: this.paramId ,
  password:'',
  confirm_password:''
});
this.loading = true;
this.menuService.getMenuData().subscribe((res:MenuItem[])=>{
  this.loading = false;
  this.menuList = res;
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


  submit(){
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
  }
  if(this.form.get(["password"])!.value != this.form.get(["confirm_password"])!.value){
    this.pass_error="Password does not match!..";
    return;
  }
  this.error="";
  this.pass_error="";
  this.loading = true;
  let userId = this.form.get(["userId"])!.value;
  let password=this.form.get(["password"])!.value;

  this.userService.createApplicationAccount(userId, password, this.checkedList).subscribe(res =>{
  this.loading = false;
  if(res){
  this.successMsg = "User ID "+userId +" Successful Registered!..."
  }
  else{
    this.error="User ID "+userId +" already exist!..."
  }
  });
}
}
