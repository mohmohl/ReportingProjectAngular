import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup, Validators} from '@angular/forms';
import { CashWithdrawExpAccResponse } from 'src/models/CashWithdrawExpAccResponse';
import { CashWithdrawExpAccService } from 'src/services/CashWithdrawExpAccService';

@Component({
  selector: 'app-bypass-account-list',
  templateUrl: './bypass-account-list.component.html',
  styleUrls: ['./bypass-account-list.component.css']
})
export class BypassAccountListComponent implements OnInit {
  loading = false;
  error = '';
  message = '';
  response : CashWithdrawExpAccResponse = new CashWithdrawExpAccResponse();
  cust_ac_no : string;
  status : string;
  form = new FormGroup({
    cust_ac_no: new FormControl(''),
    status : new FormControl('')
  });

  constructor(private service : CashWithdrawExpAccService) { }

  ngOnInit() {
    this.refresh();
  }
  refresh(){
    //debugger;

    this.loading = true;
    this.response.listData = [];
    this.service.getRefreshData().subscribe( res =>{
      this.response = res;
      if(this.response.listData.length ==0){
        this.response.listData = null;
      }
      this.loading = false;
    },
    error => {
      this.response.listData = null;
      this.loading = false;
      this.error = "Internal Server Error";
      //console.log(error);
    });

  }

  submit(){
    //debugger;
   
    this.loading = true;
    this.error = "";
    this.message = "";

    this.cust_ac_no = this.form.get(["cust_ac_no"])!.value;
    this.status = this.form.get(["status"])!.value;

    this.response.listData = [];
    this.service.getSearchData(this.cust_ac_no,this.status).subscribe( res =>{
      this.response = res;
      if(this.response.listData.length ==0){
        this.response.listData = null;
        this.message = "There is no data.";
      }
      this.loading = false;
    },
    error => {
      this.response.listData = null;
      this.loading = false;
      this.error = "Internal Server Error";
      //console.log(error);
    });
  }

}
