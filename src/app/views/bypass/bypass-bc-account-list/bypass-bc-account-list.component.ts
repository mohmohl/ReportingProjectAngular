import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CashWithdrawExpAcc } from 'src/models/CashWithdrawExpAcc';
import { CashWithdrawExpAccResponse } from 'src/models/CashWithdrawExpAccResponse';
import { CashWithdrawExpBCAccService } from 'src/services/CashWithdrawExpBCAccService';

@Component({
  selector: 'app-bypass-bc-account-list',
  templateUrl: './bypass-bc-account-list.component.html',
  styleUrls: ['./bypass-bc-account-list.component.css']
})
export class BypassBcAccountListComponent implements OnInit {
  loading = false;
  errorMsg = '';
  message = '';
  allChecked = false;
  array: CashWithdrawExpAcc[] = [];
  selectedCount = 0;
  cust_ac_no: string;
  data: CashWithdrawExpAcc = new CashWithdrawExpAcc();
  response: CashWithdrawExpAccResponse = new CashWithdrawExpAccResponse();

  form = new FormGroup({
    cust_ac_no: new FormControl('', [Validators.required, Validators.minLength(19)])
  })

  constructor(private service: CashWithdrawExpBCAccService) { }

  ngOnInit() {
    this.submit();
  }

  submit() {
    //debugger;
    this.loading = true;
    this.errorMsg = "";
    this.message = "";

    this.data.cust_ac_no = this.form.get(["cust_ac_no"])!.value;
    this.service.searchData(this.data).subscribe(res => {
      this.loading = false;
      if (res.listData != null) {
        this.response = res;

        if (this.response.listData.length == 0) {
          this.response.listData = null;
          this.errorMsg = "No result found!";
        }
      }

    },
      error => {
        this.loading = false;
        this.errorMsg = "Internal Server Error";
        console.log(error);
      });

  }

  changeSelection(e, i) {
    //debugger;
    if (e.target.checked) {
      this.response.listData[i].checked = true;
      this.selectedCount = this.selectedCount + 1;
    } else {
      this.selectedCount = this.selectedCount - 1;
      this.response.listData[i].checked = false;
    }

  }

  selectAll(e) {
    //debugger;
    if (e.target.checked) {
      for (let i = 0; i < this.response.listData.length; i++) {
        this.response.listData[i].checked = true;
      }
    } else {
      for (let i = 0; i < this.response.listData.length; i++) {
        this.response.listData[i].checked = false;
      }
    }

  }

  deleteData() {
    //debugger;
    this.errorMsg = "";
    this.message = "";

    if (this.allChecked == false && this.selectedCount == 0) {
      this.errorMsg = "Please select data to delete.";
      return;
    }
    this.loading = true;

    for (let i = 0; i < this.response.listData.length; i++) {
      if (this.response.listData[i].checked == true) {
        this.array.push(this.response.listData[i]);
      }
    }
    this.service.deleteData(this.array).subscribe(res => {
      this.loading = false;
      if (res != null) {
        this.response = new CashWithdrawExpAccResponse();
        this.response = res;
        if (this.response.listData.length == 0) {
          this.response.listData = null;
        }
        this.allChecked = false;
        this.array = [];
        this.selectedCount =0;
        this.message = "Delete Successful !....";
      }else{
        this.message = "Delete Fail !....";
      }
      
    },
      error => {
        this.loading = false;
        this.errorMsg = "Internal Server Error";
        console.log(error);
      });

  }

}
