import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CashWithdrawExpAcc } from 'src/models/CashWithdrawExpAcc';
import {User} from 'src/models/User';
import { CashWithdrawExpAccService } from 'src/services/CashWithdrawExpAccService';

@Component({
  selector: 'app-bypass-new-account',
  templateUrl: './bypass-new-account.component.html',
  styleUrls: ['./bypass-new-account.component.css']
})
export class BypassNewAccountComponent implements OnInit {
  loading = false;
  error = '';
  message = '';
  data : CashWithdrawExpAcc = new CashWithdrawExpAcc();
  cust_ac_no : string;
  amount : number;
  recommended_by : string;
  checkStatus : false;
  login_user : User = new User();

  form = new FormGroup({
    cust_ac_no : new FormControl('',[Validators.required,Validators.minLength(19)]),
    amount : new FormControl('',Validators.required),
    recommended_by : new FormControl('',Validators.required),
    checkStatus : new FormControl('')
  });

  constructor(private service: CashWithdrawExpAccService) { }

  ngOnInit() {
  }

  keyPressNumbers(event) {
    //debugger;
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  submit(){
    //debugger;
    this.message = "";
    this.data.cust_ac_no = this.form.get(["cust_ac_no"])!.value;
    this.data.amount     = this.form.get(["amount"])!.value;
    this.data.recommended_by = this.form.get(["recommended_by"])!.value;
    this.data.checkStatus = this.form.get(["checkStatus"])!.value;

    if(this.form.invalid){
      if(this.data.cust_ac_no == ""){
        this.error = "Customer Acc No is required.";
      }else if(this.data.cust_ac_no.length < 19){
        this.error = "Customer Acc No must be have 19 digits.";
      }else if(this.data.amount == "" || this.data.amount == "0"){
        this.error = "Amount is required.";
      }else if(this.data.recommended_by == ""){
        this.error = "Recommended By is required.";
      }
      return;
    }
    
    this.loading = true;
    this.error ="";
    this.message = "";

    this.login_user = JSON.parse(localStorage.getItem('currentUser'));
    this.data.user_id = this.login_user.userId;
    //console.log("u_id >>>>>>>>>>> " + this.data.user_id);

    this.service.saveData(this.data).subscribe( res =>{
      this.loading = false;
      if(res == true){
        this.message = "Save Successful.";
      }else{
        //this.message = "Save Fail."
        this.message = "This record is already exist."
      }
    },
    error => {
      this.loading = false;
      this.error = "Internal Server Error";
      console.log(error);
    });
    
  }

}
