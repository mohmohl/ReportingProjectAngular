import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CashWithdrawExpAcc } from 'src/models/CashWithdrawExpAcc';
import { User } from 'src/models/User';
import { CashWithdrawExpBCAccService } from 'src/services/CashWithdrawExpBCAccService';

@Component({
  selector: 'app-bypass-new-bc-account',
  templateUrl: './bypass-new-bc-account.component.html',
  styleUrls: ['./bypass-new-bc-account.component.css']
})
export class BypassNewBcAccountComponent implements OnInit {
  loading = false;
  error = '';
  message ='';

  cust_ac_no : string;
  line_code : string;
  serial_no : number;
  cash : number;
  recommended_by : string;
  remark : string;
  user_id: string;
  status : string;

  data : CashWithdrawExpAcc = new CashWithdrawExpAcc();
  login_user : User = new User();

  form = new FormGroup({
    cust_ac_no : new FormControl('',[Validators.required,Validators.minLength(19)]),
    line_code : new FormControl('',Validators.required),
    serial_no : new FormControl('',Validators.required),
    cash : new FormControl('',Validators.required),
    recommended_by : new FormControl(''),
    remark : new FormControl('')
  })
  constructor(private service: CashWithdrawExpBCAccService) { }

  ngOnInit() {
  }

  submit(){
    //debugger;
    this.message = "";
    this.error = "";

    this.data.cust_ac_no = this.form.get(["cust_ac_no"])!.value;
    this.data.serial_no = this.form.get(["serial_no"])!.value;
    this.data.line_code = this.form.get(["line_code"])!.value;
    this.data.cash     = this.form.get(["cash"])!.value;
    this.data.recommended_by = this.form.get(["recommended_by"])!.value;
    this.data.remark = this.form.get(["remark"])!.value;
    
    if(this.form.invalid){
      if(this.data.cust_ac_no == ""){
        this.error = "Customer Acc No is required.";
      }else if(this.data.cust_ac_no.length < 19){
        this.error = "Customer Acc No must be have 19 digits.";
      }else if(this.data.line_code ==""){
        this.error = "Line Code is required.";
      }else if(this.data.serial_no == 0){
        this.error = "Serial No is required.";
      }else if(this.data.cash == null || this.data.cash == 0){
        this.error = "Cash% is required.";
      }
      return;
    }
    
    this.loading = true;
    this.error ="";
    this.message = "";

    this.login_user = JSON.parse(localStorage.getItem('currentUser'));
    this.data.user_id = this.login_user.userId;

    this.service.saveBCData(this.data).subscribe( res =>{
      this.loading = false;
      if(res != null){
        this.message = res.message;
      }
      
    },
    error => {
      this.loading = false;
      this.error = "Internal Server Error";
      console.log(error);
    });
  }
  
}
