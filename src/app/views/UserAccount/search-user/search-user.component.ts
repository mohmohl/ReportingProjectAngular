import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/models/User';
import { UserInfo } from 'src/models/UserInfo';
import { UserDataService } from 'src/services/UserDataService';
@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  error='';
  user_id : string;
  loading = false;
  data_list:UserInfo[]=null;
  form = new FormGroup({
    userId: new FormControl('', Validators.required)
  });
  constructor(private service:UserDataService) { }

  ngOnInit() {
  }
  submit(){
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
  }
  this.error="";
  this.user_id = this.form.get(["userId"])!.value;
  this.loading = true;
  //console.log("Param = "+this.user_id)
  this.service.getFcubUserData(this.user_id).subscribe((res:UserInfo[])=>{
    this.loading = false;
    this.data_list = res;
    console.log(this.data_list[0].user_id);
  },(error) => {
    this.data_list=null;
    this.loading = false;
    this.error="Internal Server Error";
    console.log(error);
  });
}

}
